import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { jobSchemaTypeDef } from "../loaders/jobLoader";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";

const jobFormSchema = z.object({
  type: z.enum(["Full-Time", "Part-Time", "Remote", "Internship"]),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  salary: z.enum([
    "Under $50K",
    "$50K - $60K",
    "$60K - $70K",
    "$70K - $80K",
    "$80K - $90K",
    "$90K - $100K",
    "$100K - $125K",
    "$125K - $150K",
    "$150K - $175K",
    "$175K - $200K",
    "Over $200K",
  ]),
  location: z.string().min(1, "Location is required"),
  company: z.string().min(1, "Company name is required"),
  company_description: z
    .string()
    .min(10, "Company description must be at least 10 characters"),
  contact_email: z.email("Invalid email format"),
  contact_phone: z.string().min(10, "Invalid number"),
});

type JobFormSchemaTypeDef = z.infer<typeof jobFormSchema>;

// Util submitting function
const submitJob = (method: "post" | "put", url: string, data: unknown) =>
  axios[method](url, data);

const JobForm = ({ jobData }: { jobData: jobSchemaTypeDef | undefined }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobFormSchemaTypeDef>({
    defaultValues: jobData
      ? {
          title: jobData.title,
          type: jobData.type as JobFormSchemaTypeDef["type"],
          description: jobData.description,
          salary: jobData.salary as JobFormSchemaTypeDef["salary"],
          location: jobData.location,
          company: jobData.company.name,
          company_description: jobData.company.description,
          contact_email: jobData.company.contactEmail,
          contact_phone: jobData.company.contactPhone || "",
        }
      : undefined,
    resolver: zodResolver(jobFormSchema),
  });

  const onSubmit: SubmitHandler<JobFormSchemaTypeDef> = async (data) => {
    try {
      const pathname = location.pathname;
      const pathSections = pathname.split("/").filter(Boolean);

      const action = pathSections[0];
      const jobId = pathSections[1];

      const jobData = {
        title: data.title,
        type: data.type,
        description: data.description,
        location: data.location,
        salary: data.salary,
        company: {
          name: data.company,
          description: data.company_description,
          contactEmail: data.contact_email,
          contactPhone: data.contact_phone,
        },
      };

      let method: "post" | "put";
      let url: string;
      let payload: unknown;

      if (action === "edit-job" && jobId) {
        method = "put";
        url = `/api/jobs/${jobId}`;
        payload = { id: jobId, ...jobData };
      } else if (action === "add-job") {
        method = "post";
        url = "/api/jobs";
        payload = jobData;
      } else {
        throw new Error("Unrecognized route");
      }

      const res = await submitJob(method, url, payload);
      toast.success(
        action === "edit-job"
          ? "Job updated successfully!"
          : "Job added successfully!"
      );
      navigate("/jobs/".concat(res.data.id));
    } catch (error) {
      toast.error("Submission failed! Please try again.");
      console.error("Submission error:", error);
      setError("root", {
        message: "Error from backend!",
      });
    }
  };

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                {!jobData ? "Add Job" : "Edit Job"}
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  {...register("type")}
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                />
                {errors.title?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.title.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="Add any job duties, expectations, requirements, etc"
                ></textarea>
                {errors.description?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.description.message}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  {...register("salary")}
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - $60K">$50K - $60K</option>
                  <option value="$60K - $70K">$60K - $70K</option>
                  <option value="$70K - $80K">$70K - $80K</option>
                  <option value="$80K - $90K">$80K - $90K</option>
                  <option value="$90K - $100K">$90K - $100K</option>
                  <option value="$100K - $125K">$100K - $125K</option>
                  <option value="$125K - $150K">$125K - $150K</option>
                  <option value="$150K - $175K">$150K - $175K</option>
                  <option value="$175K - $200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  {...register("location")}
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                />
                {errors.location?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.location.message}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                />
                {errors.company?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.company.message}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  {...register("company_description")}
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="What does your company do?"
                ></textarea>
                {errors.company_description?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.company_description.message}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  {...register("contact_email")}
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                />
                {errors.contact_email?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.contact_email.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  {...register("contact_phone")}
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Phone Number for applicants"
                />
                {errors.contact_phone?.message && (
                  <div className="my-2">
                    <span className="text-base text-red-500">
                      {errors.contact_phone.message}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-7">
                <button
                  className={`text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline ${
                    isSubmitting
                      ? "cursor-not-allowed bg-indigo-300 hover:bg-indigo-300"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? jobData
                      ? "Updating job..."
                      : "Adding job..."
                    : jobData
                    ? "Edit Job"
                    : "Add Job"}
                </button>
              </div>

              {errors.root?.message && (
                <div className="my-2">
                  <span className="text-base text-red-500">
                    {errors.root.message}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobForm;

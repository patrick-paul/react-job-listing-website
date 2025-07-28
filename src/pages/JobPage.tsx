import type { jobSchemaTypeDef } from "../loaders/jobLoader";
import { Link, type NavigateFunction } from "react-router-dom";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import showConfirmationToast from "../components/ui/showConfirmationToast";
import axios from "axios";

function handleDelete(jobId: string, navigate: NavigateFunction) {
  showConfirmationToast({
    onConfirm: async () => {
      try {
        await axios.delete(`/api/jobs/${jobId}`);
        navigate("/jobs");
      } catch (error) {
        toast.error("Failed to delete item. Please try again.");
        console.error("Delete failed:", error);
      }
    },
    message: "This will permanently delete the item. Are you sure?",
    confirmText: "Yes, delete it",
    cancelText: "No, keep it",
    title: "Delete Confirmation",
  });
}

const JobPage = () => {
  const job = useLoaderData<jobSchemaTypeDef>();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const pathSections = pathname.split("/").filter(Boolean);

  const jobId = pathSections[1];

  return (
    <>
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="inline text-lg mr-3" /> Back to Job Browsing
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50 mb-15">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="inline text-orange-700 text-lg mb-3 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={"/edit-job/".concat(job.id.toString())}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => handleDelete(jobId.toString(), navigate)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;

/////////// an implementation using useEffect()

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         if (typeof id === "string") {
//           const res = await fetch("/api/jobs/".concat(id));
//           const data = await res.json();
//           setJob(data);
//         } else new Error("Can not resolve the job id");
//       } catch (error) {
//         // show error to the user
//         console.log("Error fetching job", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

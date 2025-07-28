import type { job as jobTsType } from "../global-app-types";
import { useState, useEffect } from "react";
import JobCard from "./ui/JobCard";
import Spinner from "./ui/Spinner";
import axios from "axios";

const JobListing = ({ isHomePage }: { isHomePage: boolean }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("api/jobs");
        setJobs(res.data);
      } catch (error) {
        // alert on error
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHomePage ? "Recent Jobs" : "Browse All Jobs"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(isHomePage ? jobs.slice(0, 3) : jobs).map((job: jobTsType) => {
              return (
                <JobCard
                  key={job.id}
                  jobType={job.type}
                  jobTitle={job.title}
                  jobContent={job.description}
                  jobLocation={job.location}
                  jobSalary={job.salary}
                  jobLinkAddress={job.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;

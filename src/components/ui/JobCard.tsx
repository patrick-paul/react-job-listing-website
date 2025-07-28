import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

type JobCardType = {
  jobType: string;
  jobTitle: string;
  jobContent: string;
  jobSalary: string;
  jobLocation: string;
  jobLinkAddress: number;
};

const JobCard = ({
  jobType,
  jobTitle,
  jobContent,
  jobSalary,
  jobLocation,
  jobLinkAddress,
}: JobCardType) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = jobContent;

  if (!showFullDescription)
    description = description.slice(0, 90).concat("...");

  const handleReadMoreOnclick = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{jobType}</div>
          <h3 className="text-xl font-bold">{jobTitle}</h3>
        </div>

        <div className="mb-5">{description} </div>
        <button
          className="text-indigo-600 cursor-pointer hover:text-indigo-700 mb-5"
          onClick={handleReadMoreOnclick}
        >
          Read {showFullDescription ? "Less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2">{jobSalary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-3 mr-1" />
            {jobLocation}
          </div>
          <Link
            to={"/jobs/".concat(String(jobLinkAddress))}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

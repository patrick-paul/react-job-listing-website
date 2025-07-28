import { useLoaderData } from "react-router-dom";
import type { jobSchemaTypeDef } from "../loaders/jobLoader";
import JobForm from "../components/JobForm";

const EditJobPage = () => {
  const jobData = useLoaderData<jobSchemaTypeDef>();
  return <JobForm jobData={jobData} />;
};

export default EditJobPage;

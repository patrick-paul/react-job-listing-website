import JobListing from "../components/JobListing";

const JobsPage = () => {
  return (
    <section className="bg-blue-50 px-4 py-6 mb-15">
      <JobListing isHomePage={false} />
    </section>
  );
};

export default JobsPage;

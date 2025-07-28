import Card from "./ui/Card";

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card
            title="For Developers"
            content="Browse our React jobs and start your career today"
            linkAddress="/jobs"
            linkText="Browse Jobs"
          />
          <Card
            bgColor="bg-indigo-100"
            title="For Employers"
            content="List your job to find the perfect developer for the role"
            linkAddress="/add-job"
            linkText="Add Job"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCards;

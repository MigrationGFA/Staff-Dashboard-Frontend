const TotalTasks = () => {
  return (
    <div className="flex flex-col border p-4 rounded-lg shadow-lg my-8">
      <div className="flex flex-col space-y-4">
        <div className="text-xl lg:text-3xl text-center lg:text-left font-semibold text-primary10">
          Total Tasks(Weekly)
        </div>
        <div className="text-xl lg:text-3xl text-center lg:text-left text-sec11">
          0
        </div>
      </div>
    </div>
  );
};

export default TotalTasks;

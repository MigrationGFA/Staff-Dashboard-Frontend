const TotalTasks = () => {
  return (
    <div className="flex flex-col border px-4 py-6 shadow-lg my-8 bg-ter1 rounded-2xl">
      <div className="flex flex-col space-y-2">
        <div className="text-xl lg:text-3xl text-center lg:text-left font-semibold text-primary3">
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

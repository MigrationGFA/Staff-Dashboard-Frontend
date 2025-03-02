import { TextSpan } from "../Text";

const OverviewStats = () => {
  return (
    <div className="py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between text-white">
      <div className="flex flex-col justify-center shadow-xl rounded-lg p-4 bg-gradient-to-tr from-ter6 to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl text-white">
          Total Attendance (Weekly)
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          0%
        </TextSpan>
      </div>
      <div className="flex flex-col shadow-xl rounded-lg p-4 bg-gradient-to-tr from-sec10 to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl">
          Weekly KPI
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          0%
        </TextSpan>
      </div>
      <div className="flex flex-col shadow-xl rounded-lg p-4 bg-gradient-to-tr from-grad12 to-sec11 space-y-4 hover:scale-105 transition duration-300">
        <TextSpan size="" color="" className="text-xl">
          Total Projects(Weekly)
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          0
        </TextSpan>
      </div>
    </div>
  );
};

export default OverviewStats;

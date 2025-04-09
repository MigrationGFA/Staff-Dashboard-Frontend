import { PiNotebook } from "react-icons/pi";
import { TextSpan } from "../Text";
import ProgressBar from "@ramonak/react-progress-bar";

const OverviewDailyProjectStats = () => {
  const staffProgress = [
    {
      task: "sales dashboard",
      status: "In Progress",
      value: 30,
    },
    {
      task: "Hr dashboard",
      status: "In Progress",
      value: 70,
    },
    {
      task: "Finance dashboard",
      status: "In Progress",
      value: 50,
    },
  ];

  return (
    <div className="my-10 py-6 px-4 lg:px-9 flex flex-col shadow-lg rounded-xl border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <PiNotebook
            size={50}
            className="text-sec11 p-2 border rounded-lg shadow"
          />
          <TextSpan size="xl" color="sec3" className="font-medium">
            Daily Projects
          </TextSpan>
        </div>
        <TextSpan
          size=""
          color=""
          className="border py-2 px-3.5 rounded-lg text-sec3"
        >
          Daily
        </TextSpan>
      </div>
      <div className="bg-sec1 my-4 py-4 rounded-lg shadow">
        {staffProgress.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center my-2 px-4 lg:px-10"
          >
            <div className="w-full flex items-center justify-between p-4">
              <TextSpan size="" color="" className="text-sec3">
                {item.task}
              </TextSpan>
              <TextSpan size="" color="" className="text-sec10">
                {item.status}
              </TextSpan>
            </div>
            <div className="w-full">
              <ProgressBar
                completed={item.value}
                maxCompleted={100}
                bgColor="#9F68FE"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewDailyProjectStats;

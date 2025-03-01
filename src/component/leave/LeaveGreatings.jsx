import Welcome from "../Welcome";
import { PiCalendarDots } from "react-icons/pi";

const LeaveGreatings = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <PiCalendarDots className="text-primary3 place-self-center w-10 h-10 lg:w-24 lg:h-24 mt-3 lg:mt-0" />
        <Welcome header="Request Time" message="Kindly enter the details" />
      </div>
    </div>
  );
};

export default LeaveGreatings;

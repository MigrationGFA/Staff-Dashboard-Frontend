import Welcome from "../Welcome";
import { CiSquareCheck } from "react-icons/ci";

const LeaveGreatings = () => {
  return (
    // <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
      <CiSquareCheck className="text-primary3 place-self-center w-10 h-10  lg:mt-0" />
      <Welcome header="Leave" message="" />
    </div>
    // </div>
  );
};

export default LeaveGreatings;

import { RxDashboard } from "react-icons/rx";
import { ButtonSmallPurple } from "../Buttons";
import Welcome from "../Welcome";
const OverviewGreetings = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <RxDashboard className="text-primary3 place-self-center w-10 h-10 lg:w-20 lg:h-20 mt-3 lg:mt-0" />
        <Welcome header="Dashboard" message="" />
      </div>
      <ButtonSmallPurple
        padding=""
        height=""
        width=""
        className="p-3 whitespace-nowrap"
      >
        Check In
      </ButtonSmallPurple>
    </div>
  );
};

export default OverviewGreetings;

import Welcome from "../Welcome";
import { RxQuestionMarkCircled } from "react-icons/rx";

const HelpCenterGreetings = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <RxQuestionMarkCircled className="text-primary3 place-self-center w-10 h-10 lg:w-24 lg:h-24 mt-3 lg:mt-0 " />
        <Welcome
          header="Help Center"
          message="Kindly note that your data and information are saved for urgent response"
        />
      </div>
    </div>
  );
};

export default HelpCenterGreetings;

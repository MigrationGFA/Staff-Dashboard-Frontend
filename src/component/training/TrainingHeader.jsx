import Welcome from "../Welcome";
import { LiaSwatchbookSolid } from "react-icons/lia";

const TrainingHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <LiaSwatchbookSolid className="text-primary3 place-self-center w-10 h-10 lg:w-24 lg:h-24 mt-3 lg:mt-0 " />
        <Welcome
          header="Training Opportunity"
          message="Your Mind Is A Tool, Sharpen It"
        />
      </div>
    </div>
  );
};

export default TrainingHeader;

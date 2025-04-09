import { TbShare } from "react-icons/tb";
import { ButtonLongPurple } from "../Buttons";

const TrainingCards = () => {
  const trainings = Array(6).fill({
    title: "Full-Stack Developer",
    description:
      "Non ac blandit dui. Pulvinar vulputate lorem ac sed. Pulvinar et egestas lacus interdum velit.",
    rate: "$200/hr",
    type: "Full Time",
    mode: "Onsite",
    validTill: "Mar 20, 2025",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {trainings.map((training, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          {/* Valid Till */}
          <div className="flex justify-between items-center mb-3">
            <span className="bg-ter1 text-sec11 px-3 py-1 rounded-full text-sm font-medium">
              Valid till: <strong>{training.validTill}</strong>
            </span>
            <button className="text-sec11 hover:text-primary3">
              <TbShare />
            </button>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-semibold text-sec3">{training.title}</h3>
          <p className="text-sec11 text-sm">{training.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-4">
            <span className="border text-primary3 px-3 py-1 rounded-lg text-xs font-medium">
              {training.rate}
            </span>
            <span className="border text-primary3 px-3 py-1 rounded-lg text-xs font-medium">
              {training.type}
            </span>
            <span className="border text-primary3 px-3 py-1 rounded-lg text-xs font-medium">
              {training.mode}
            </span>
          </div>

          {/* Apply Button */}
          <ButtonLongPurple className="w-full rounded-lg transition">
            Apply
          </ButtonLongPurple>
        </div>
      ))}
    </div>
  );
};

export default TrainingCards;

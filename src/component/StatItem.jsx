import PropTypes from "prop-types";
import { FaCheckCircle, FaRegArrowAltCircleUp } from "react-icons/fa";
import { Text, TextSpan } from "./Text";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StatItem = ({
  icon,
  count,
  label,
  iconColor = "transparent",
  percentage,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 w-full items-center justify-center shadow-lg md:shadow-none border rounded-lg lg:space-x-16 mt-2 mb-2 p-4 hover:scale-105 hover:shadow-lg transition duration-300">
      {icon && (
        <img
          src={icon}
          alt={label}
          className="rounded-full w-10 h-10 bg-slate-400 place-self-center lg:place-self-start"
        />
      )}
      <div className="flex flex-col items-center ">
        <div className="relative">
          <Text weight="font-medium" className="text-xl md:text-4xl">
            {count || 0}
          </Text>
          <FaCheckCircle
            color={iconColor}
            className="absolute top-0 -right-5 md:-right-8"
          />
        </div>
        <Text className="capitalize text-center md:text-left whitespace-nowrap">
          {label}
        </Text>
        {percentage && (
          <div className="flex space-x-1 justify-center items-center whitespace-nowrap">
            <FaRegArrowAltCircleUp
              color="lightgreen"
              className="bg-ter8 rounded-full"
            />
            <TextSpan className="text-primary8 text-xs md:text-sm">
              {percentage}
            </TextSpan>
          </div>
        )}
      </div>
    </div>
  );
};

export const SubStat = ({
  plan,
  count,
  color,
  totalAmount,
  label = "Subscription",
}) => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user.role);

  let colorCheck = "";

  switch (color) {
    case "red":
      colorCheck = "bg-sec8 text-white";
      break;
    case "green":
      colorCheck = "bg-primary7 text-white";
      break;
    case "blue":
      colorCheck = "bg-grad12 text-white";
      break;
    default:
      colorCheck = "bg-sec10 text-white";
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center border p-6 rounded-lg shadow-lg space-y-4">
      <div
        className={`py-2 px-8 rounded-lg  border whitespace-nowrap ${
          userRole === "Finance" ? colorCheck : "text-primary10"
        }`}
      >
        {/* ${colorCheck} */}
        {plan} plan
      </div>
      <Text size="" weight="font-semibold" className="text-3xl">
        {count || 0}
      </Text>
      <div className="text-base">{label}</div>
      {userRole === "Finance" ? (
        <div className="border py-2.5 px-10 rounded-lg"> ₦{totalAmount}</div>
      ) : (
        <button
          className="flex items-center gap-1 bg-primary3 text-white px-14 py-2 rounded-lg mb-10"
          onClick={() => navigate(`/staff/plantable/${plan}`)}
        >
          View
        </button>
      )}
    </div>
  );
};
// export const TransactionStat = ({ label, amount, total,color }) => {

//   return (
//     <div className="flex flex-col items-center justify-center border p-6 rounded-lg shadow-lg space-y-4">
//       <div className={`py-2 px-8 rounded-lg ${colorCheck}`}>{label} plan</div>
//       <div>
//         <div></div>
//       <Text size="" weight="font-semibold" className="text-3xl">
//         {count}
//       </Text></div>
//       <div className="text-base">{label}</div>
//     </div>
//   );
// };

SubStat.prototypes = {
  plan: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.any.isRequired,
  label: PropTypes.string,
};

StatItem.defaultProps = {
  label: "Subscription",
};

StatItem.propTypes = {
  icon: PropTypes.string,
  count: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  percentage: PropTypes.string,
};

StatItem.defaultProps = {
  iconColor: "transparent",
};

export default StatItem;

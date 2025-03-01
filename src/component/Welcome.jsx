import { Heading, TextSpan } from "./Text";
import { useSelector } from "react-redux"; // Ensure you import useSelector

const Welcome = ({ header, message }) => {
  const user = useSelector((state) => state?.auth?.user);
  const userRole = useSelector((state) => state?.auth?.user?.role);
  const defaultMessage = user ? (
    <TextSpan
      color=""
      className="flex items-center justify-center md:justify-start"
    >
      Hi <div className="font-semibold ms-1">{user.fullName.split(" ")[0]}</div>
      , welcome back to your Dashboard
      {/* to Dimp {userRole || "Admin"}! */}
    </TextSpan>
  ) : (
    `Hi User, welcome back to Dimp ${userRole || "Admin"}!`
  );
  return (
    <div className="w-full flex flex-col py-4 md:py-10">
      <Heading
        level={1}
        className="text-center md:text-left text-xl md:text-3xl"
        size=""
        color=""
        weight="font-semibold"
        font="font-body"
        lineHeight="leading-1"
      >
        {header}
      </Heading>
      <TextSpan className="text-primary5 text-center md:text-left">
        {message || defaultMessage}
      </TextSpan>
    </div>
  );
};

Welcome.defaultProps = {
  header: "Overview for Sales Department",
};

export default Welcome;

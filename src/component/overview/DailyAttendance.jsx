import { ButtonSmallPurple } from "../Buttons";
import { ShortInputWithPlaceholder } from "../Inputs";
import { Heading } from "../Text";

const DailyAttendance = () => {
  return (
    <div className="px-4 flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="flex flex-col lg:flex-row items-center gap-2 lg:space-x-4">
        <Heading
          className="text-2xl lg:text-xl text-sec11"
          size=""
          color=""
          weight="font-semibold"
          font="font-body"
          lineHeight=""
        >
          Daily Attendance Code
        </Heading>
        <ShortInputWithPlaceholder
          placeholder="Input Code..."
          size=""
          color=""
          weight="font-normal"
          lineHeight=""
          className="border-primary3 border-2 focus:ring-primary11 rounded-lg text-sec11 "
        />
      </div>
      <ButtonSmallPurple
        className="py-3 px-3.5 rounded-lg"
        width=""
        bg="primary3"
        padding=""
        height=""
      >
        Check In
      </ButtonSmallPurple>
    </div>
  );
};

export default DailyAttendance;

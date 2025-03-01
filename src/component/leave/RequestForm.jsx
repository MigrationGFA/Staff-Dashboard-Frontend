import { useState } from "react";
import { Heading, TextSpan } from "../Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import Welcome from "../Welcome";
import LeaveGreatings from "./LeaveGreatings";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    leaveType: "",
    leaveFrom: "",
    leaveTo: "",
    reportingStaff: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="lg:place-self-start">
        <LeaveGreatings />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-y-5 text-primary5 hover:text-sec11"
      >
        <div className="flex flex-col space-y-1">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Department</label>
          <select
            name="department"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          >
            <option value="">-- Select Option --</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave Type</label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          >
            <option value="">-- Select Option --</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave From</label>
          <select
            name="leaveFrom"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          >
            <option value="">-- Select Option --</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave To</label>
          <select
            name="leaveTo"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          >
            <option value="">-- Select Option --</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reporting Staff</label>
          <select
            name="reportingStaff"
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11"
          >
            <option value="">-- Select Option --</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Briefly describe..."
            onChange={handleChange}
            className="input-field rounded-lg outline-none focus:border-primary11 h-24"
          ></textarea>
        </div>

        <div className="flex justify-between mb-10">
          <ButtonSmallWhite
            padding=""
            width=""
            type="button"
            className="py-3.5 px-6"
          >
            Edit
          </ButtonSmallWhite>
          <ButtonSmallPurple
            padding=""
            width=""
            type="submit"
            className="py-3.5 px-6"
          >
            Apply
          </ButtonSmallPurple>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;

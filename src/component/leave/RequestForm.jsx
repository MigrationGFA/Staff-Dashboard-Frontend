import { useEffect, useState } from "react";
import { Heading, TextSpan } from "../Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import Welcome from "../Welcome";
import LeaveGreatings from "./LeaveGreatings";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../ShowToast";

const RequestForm = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.email);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    type: "",
    from: "",
    to: "",
    reportingStaff: "",
    reason: "",
  });
  const [reportingStaff, setReportingStaff] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.requestForm({
        accessToken,
        refreshToken,
        userId: user.userId,
        formData,
      });

      showToast(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReportingStaff = async () => {
    try {
      const response = await api.getreportingStaff({
        accessToken,
        refreshToken,
        email: user.email,
      });
      setReportingStaff(Array.isArray(response) ? response : [response]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReportingStaff();
  }, [accessToken, refreshToken]);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="lg:place-self-start w-full">
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
            className="rounded-lg focus:ring-primary11"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Department</label>
          <select
            name="department"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
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
            name="type"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          >
            <option value="">-- Select Option --</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave From</label>
          <input
            type="date"
            name="from"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave To</label>
          <input
            type="date"
            name="to"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reporting Staff</label>
          <select
            name="reportingStaff"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          >
            <option value="">-- Select Option --</option>
            {reportingStaff.length > 0 &&
              reportingStaff.map((staff) => (
                <option
                  key={staff.reportingOfficerId}
                  value={staff.reportingOfficerId}
                >
                  {staff.reportingOfficerName}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Briefly describe..."
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11 h-24"
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

import { useEffect, useState } from "react";
import { Heading, TextSpan } from "../Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import Welcome from "../Welcome";
import LeaveGreatings from "./LeaveGreatings";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../ShowToast";
import { FaSpinner } from "react-icons/fa";
import LeaveStats from "./LeaveStats";

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
  const [sickNoteImage, setSickNoteImage] = useState(null);
  const [sickNotePreview, setSickNotePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("department", formData.department);
      data.append("type", formData.type);
      data.append("from", formData.from);
      data.append("to", formData.to);
      data.append("reportingOfficerId", formData.reportingStaff);
      data.append("shortDescription", formData.reason);
      data.append("userId", user.userId);

      if (sickNoteImage) {
        data.append("medicalImage", sickNoteImage);
      }

      const response = await api.requestForm({
        accessToken,
        refreshToken,
        formData: data,
      });

      showToast(response?.message);
    } catch (error) {
      showToast(error?.message);
      console.error(error);
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData((prev) => ({
      ...prev,
      type: "",
      from: "",
      to: "",
      reportingStaff: "",
      reason: "",
    }));
    setSickNoteImage(null);
    setSickNotePreview(null);
  };

  const fetchReportingStaff = async () => {
    try {
      const response = await api.getreportingStaff({
        accessToken,
        refreshToken,
        email: user.email,
      });
      
      setReportingStaff(
        Array.isArray(response.officers) ? response.officers : [response.officers]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user?.profile?.fullName || "",
        email: user?.email || "",
        department: user?.department || "",
        type: "",
        from: "",
        to: "",
        reportingStaff: "",
        reason: "",
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchReportingStaff();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    return () => {
      if (sickNotePreview) {
        URL.revokeObjectURL(sickNotePreview);
      }
    };
  }, [sickNotePreview]);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="lg:place-self-start w-full">
        <LeaveGreatings />
        <LeaveStats />
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
            value={user?.profile?.fullName}
            placeholder="Full name"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11 bg-primary6"
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11 bg-primary6"
            readOnly
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={user?.department}
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11 bg-primary6"
            readOnly
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          >
            <option value="">--Select Option--</option>
            <option value="casual leave">Casual Leave</option>
            <option value="sick leave">Sick Leave</option>
            <option value="annual leave">Annual Leave</option>
            <option value="emergency leave">Emergency Leave</option>
            <option value="study leave">Study Leave</option>
            <option value="paternity leave">Paternity Leave</option>
            <option value="maternity leave">Maternity Leave</option>
          </select>
        </div>

        {formData.type === "sick leave" && (
          <div className="flex flex-col space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Sick Leave Image upload(Medical report)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 40m0-32h.001v.001H28V8zm4 4h.001v.001H32V12zm4 4h.001v.001H36V16z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex justify-center text-sm text-gray-600">
                  <label
                    htmlFor="sickNote"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="text-center">Upload an Image</span>
                    <input
                      id="sickNote"
                      name="sickNote"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.size > 3 * 1024 * 1024) {
                          showToast("Image size must be less than 3MB");
                          setSickNoteImage(null);
                          setSickNotePreview(null);
                          e.target.value = "";
                        } else {
                          setSickNoteImage(file);
                          setSickNotePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 3MB</p>
              </div>
            </div>
            {sickNoteImage && (
              <div className="mt-4">
                <TextSpan weight="font-semibold">Selected File:</TextSpan>{" "}
                <TextSpan>{sickNoteImage.name}</TextSpan>
                {/* Preview */}
                {sickNotePreview && (
                  <div className="mt-2">
                    <img
                      src={sickNotePreview}
                      alt="Preview"
                      className="max-w-xs rounded shadow-md border"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <label>Leave From</label>
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Leave To</label>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reporting Staff</label>
          <select
            name="reportingStaff"
            value={formData.reportingStaff}
            onChange={handleChange}
            className="rounded-lg focus:ring-primary11"
          >
            <option value="">-- Select Option --</option>
            {reportingStaff.length > 0 &&
              reportingStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Briefly describe..."
            value={formData.reason}
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
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <FaSpinner className="animate-spin text-white text-lg" />
                <span>Applying...</span>
              </div>
            ) : (
              "Apply"
            )}
          </ButtonSmallPurple>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;

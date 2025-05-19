import AxiosInterceptor from "../component/AxiosInterceptor";

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

//Onboarding Endpoint
const onboarding = async ({ accessToken, refreshToken, payload }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/admin/signup`, {
      payload,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

// Dashboard Endpoints
const allUserInformation = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/all-users-informations/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const checkIn = async ({ accessToken, refreshToken, email, code }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/staff/checkin`, {
      email: email,
      code: code,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const requestForm = async ({ accessToken, refreshToken, formData }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/leave-request`,
      formData
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const profileForm = async ({
  accessToken,
  refreshToken,
  userId,
  formData,
  profileImage,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/update-profile/${userId}`,
      {
        fullName: formData.fullName,
        dob: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.homeAddress,
        nextOfKinName: formData.nextOfKin,
        medicalStatus: formData.medicalStatus,
        medicalDescription: formData.medicalDescription,
        maritalStatus: formData.maritalStatus,
        nextOfKinContact: formData.nextOfKinContact,
        nextOfKinAddress: formData.nextOfKinAddress,
        image: profileImage,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to save. Try again later."
    );
  }
};
const getreportingStaff = async ({ accessToken, refreshToken, email }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/reporting-officer`,
      {
        email,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getTaskAssigner = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/task/assigner/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get task assigner"
    );
  }
};

const getTaskAssignee = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/assignee`, {
      email: userEmail,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get task assignee"
    );
  }
};
const getTotalProject = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/tasks/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getLeaveSummary = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/leave/summary/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getOngoingTasks = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ongoingTask/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getAttendance = async ({ accessToken, refreshToken, filter, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/attendance/${userId}?type=${filter}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getTaskDetails = async ({ accessToken, refreshToken, taskId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/view/${taskId}`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get Task Details"
    );
  }
};

const getStaffDetails = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/profile/department?department=${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get staff Details"
    );
  }
};
const addTask = async ({ accessToken, refreshToken, userId, formData }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/task`, {
      userId,
      name: formData.taskName,
      assignerId: formData.assignedBy,
      assigneeId: formData.assignedTo,
      duration: formData.duration,
      startingDate: formData.startDate,
      endDate: formData.endDate,
      shortDescription: formData.reason,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const submitAnonymousMessage = async ({
  accessToken,
  refreshToken,
  formData,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/anonymous-suggestion`,
      {
        department: "Dimp",
        suggestion: formData.message,
        reason: formData.reason,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const submitHelpCenterMessage = async ({
  accessToken,
  refreshToken,
  formData,
  userId,
  department,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/createSupportTicket`,
      {
        userId,
        department: department,
        message: formData.message,
        reason: formData.reason,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getSuggestionByDept = async ({
  accessToken,
  refreshToken,
  department,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/suggestion/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getHelpData = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/getTicketsByUser/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

export default {
  allUserInformation,
  checkIn,
  requestForm,
  addTask,
  getreportingStaff,
  submitAnonymousMessage,
  getSuggestionByDept,
  submitHelpCenterMessage,
  getTaskAssigner,
  getTaskAssignee,
  getTotalProject,
  getAttendance,
  getOngoingTasks,
  getTaskDetails,
  profileForm,
  getStaffDetails,
  onboarding,
  getLeaveSummary,
  getHelpData,
};

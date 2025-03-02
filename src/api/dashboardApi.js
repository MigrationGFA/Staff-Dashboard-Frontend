import AxiosInterceptor from "../component/AxiosInterceptor";

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

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

export default {
  allUserInformation,
};

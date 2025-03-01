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

const allSubscription = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/all-subscription/${userEmail}`
    );

    return response.data.allSubscriptions;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeRecentTransaction = async ({
  accessToken,
  refreshToken,
  activeTab,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/withdrawals/${activeTab}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeNmvTable = async ({ accessToken, refreshToken, userEmail }) => {
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

const totalSubscription = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-subscription-plan-type-and-total-subscription/${userEmail}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const subscriptionStat = async ({
  accessToken,
  refreshToken,
  userEmail,
  selectedYear,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-revenue-sub/${userEmail}/${selectedYear}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeSubscriptionStat = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-subscription-income/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve subcription income"
    );
  }
};

const userStats = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-user-stats/${userEmail}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const transactionStats = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-transactions/${userEmail}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const freePaidPlanSubcribers = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/all-subscribers/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const lineChartUserbaseOverview = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-monthly-registration/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const barChartUserbaseOverview = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-monthly-subscription/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeTransactionIncomeChart = async ({
  accessToken,
  refreshToken,
  filterType,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/transactions?filterType=${filterType}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeGmvBarchart = async ({
  accessToken,
  refreshToken,
  filterType,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/transactions?filterType=${filterType}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const monthlySubscriptionBarChart = async ({
  accessToken,
  refreshToken,
  filterType,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/subscription-details?filterType=${filterType}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const gmvbarChart = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/admin/gmv`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const nmvbarChart = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/admin/nmv`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const withdrawalRequest = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/total-withdrawals`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const financeAmountPaid = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/admin/amount-paid`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeUnpaidAmount = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/unpaid-amount`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const transactionIncome = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/transaction-income`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const supportInformation = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/supports-information/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const supportInformationSingle = async ({
  accessToken,
  refreshToken,
  userEmail,
  ticket,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/user-supports/${ticket}/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const userInformation = async ({
  accessToken,
  refreshToken,
  userEmail,
  id,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/user-information/${id}/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const withdrawalDetailsInformation = async ({
  accessToken,
  refreshToken,
  userEmail,
  id,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/withdrawal-details/${id}/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const financeWithdrawalTable = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/all-creator-withdrawals/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all data"
    );
  }
};

const creatorAndEndUserAccountTable = async ({
  accessToken,
  refreshToken,
  userEmail,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/transaction-history/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all data"
    );
  }
};

const notificationData = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin-notification/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all data"
    );
  }
};

const storeCounts = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/stores-count/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const subData = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/admin/all-subscription/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const subCategoryTable = async ({
  accessToken,
  refreshToken,
  userEmail,
  store,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-a-subcategory/${userEmail}/${store}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const storeByLocation = async ({
  accessToken,
  refreshToken,
  userEmail,
  country,
  state,
  lga,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/store-by-location/${userEmail}`,
      { country, state, lga }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const allCategories = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/categories-count/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const categoriesOverview = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-subcategories/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const categoriesOverviewBrief = async ({
  accessToken,
  refreshToken,
  userEmail,
  selectedYear,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/store-by-date/${userEmail}/${selectedYear}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const storeByCountry = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/store-by-country/${userEmail}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const storeByCountrySingle = async ({
  accessToken,
  refreshToken,
  userEmail,
  id,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/store-by-state/${userEmail}`,
      { country: id }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const storeByState = async ({
  accessToken,
  refreshToken,
  userEmail,
  country,
  state,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/store-by-localGovernment/${userEmail}`,
      { country: country, state: state }
    );

    console.log(country, state);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const totalSalesRecord = async ({
  accessToken,
  refreshToken,
  userEmail,
  selectedYear,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-sales-record/${userEmail}/${selectedYear}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const approvePayment = async ({
  accessToken,
  refreshToken,
  email,
  password,
  withdrawalId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/admin/approve-withdrawal`,
      {
        email,
        password,
        withdrawalId,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export default {
  allUserInformation,
  allSubscription,
  totalSubscription,
  userStats,
  transactionStats,
  freePaidPlanSubcribers,
  lineChartUserbaseOverview,
  supportInformation,
  supportInformationSingle,
  userInformation,
  financeWithdrawalTable,
  creatorAndEndUserAccountTable,
  notificationData,
  barChartUserbaseOverview,
  withdrawalDetailsInformation,
  allCategories,
  storeCounts,
  subData,
  categoriesOverview,
  categoriesOverviewBrief,
  storeByCountry,
  storeByCountrySingle,
  storeByState,
  totalSalesRecord,
  subscriptionStat,
  subCategoryTable,
  storeByLocation,
  approvePayment,
  gmvbarChart,
  nmvbarChart,
  transactionIncome,
  financeAmountPaid,
  financeUnpaidAmount,
  withdrawalRequest,
  financeTransactionIncomeChart,
  monthlySubscriptionBarChart,
  financeRecentTransaction,
  financeNmvTable,
  financeGmvBarchart,
  financeSubscriptionStat,
};

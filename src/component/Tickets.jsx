import { useEffect, useState } from "react";
import { Text } from "./Text";
import { ButtonSmallPurple } from "./Buttons";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { LongInputWithPlaceholder } from "./Inputs";
import { MdOutlineCancel } from "react-icons/md";
import profile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import api from "../api/dashboardApi.js";
import { useSelector } from "react-redux";
import { showToast } from "./ShowToast.jsx";

const Tickets = ({ ticket, backButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const userEmail = useSelector((state) => state?.auth?.user.email);

  const fetchTicketDetails = async () => {
    try {
      const response = await api.supportInformationSingle({
        accessToken,
        refreshToken,
        userEmail,
        ticket,
      });
      setTicketDetails(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      showToast(errorMessage);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [userEmail]);

  const handleForwardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Loading...";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: "short",
    }).format(date);
  };

  return (
    <div className="px-4 mb-4">
      {/* User Message Section */}
      <div className="flex flex-col rounded-lg">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between mt-4">
            <Text
              size=""
              weight="font-semibold"
              color="primary3"
              className="text-lg text-primary3"
            >
              #{ticketDetails.id}- {ticketDetails.reason}
            </Text>
            <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 lg:space-x-2">
              <ButtonSmallPurple
                onClick={backButton}
                bg="primary3"
                padding=""
                width="w-20 lg:w-24"
                className="rounded-lg hover:bg-primary4"
              >
                Return
              </ButtonSmallPurple>
              <ButtonSmallPurple
                bg="sec8"
                padding="2"
                width="w-20 lg:w-36"
                className="rounded-lg"
              >
                Close Ticket
              </ButtonSmallPurple>
            </div>
          </div>
          <div className="rounded-lg">
            <div className="relative flex flex-col md:flex-row space-y-4 md:space-y-0 bg-primary3 items-center justify-between p-3 rounded-t-lg">
              <Text
                size=""
                weight="font-semibold"
                className="text-xl text-black"
              >
                User A
              </Text>
              <div className="flex items-center justify-between space-x-10">
                <ButtonSmallPurple
                  bg="primary1"
                  padding="2"
                  onClick={handleForwardClick}
                  className="text-black flex items-center justify-center space-x-2"
                >
                  <Text weight="font-semibold">Forward Message </Text>
                  <IoReturnUpForwardOutline size={20} color="black" />
                </ButtonSmallPurple>
                <Text
                  size=""
                  color="primary1"
                  weight="font-semibold"
                  className=""
                >
                  {formatDate(ticketDetails.createdAt)}
                </Text>
              </div>
              {/* Forward Message Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="flex flex-col space-y-4 bg-primary1 rounded-lg w-auto h-64 p-7">
                    <div
                      className="w-full flex items-center justify-end"
                      onClick={handleCloseModal}
                    >
                      <MdOutlineCancel size={20} />
                    </div>

                    <LongInputWithPlaceholder
                      type="text"
                      placeholder="Search here"
                      className="w-full mb-2 p-1 border rounded-xl focus:border-primary3"
                    ></LongInputWithPlaceholder>

                    <Text className="flex space-x-2 items-center">
                      <div>Forward message to</div>{" "}
                      <IoReturnUpForwardOutline size={20} />
                    </Text>
                    <div className="flex items-center justify-center space-x-3">
                      <img
                        src={profile}
                        className="w-10 h-10 bg-primary8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <Text
                            size=""
                            weight="font-semibold"
                            className="text-lg md:text-xl"
                          >
                            Sola Adewunmi
                          </Text>
                          <Text
                            size=""
                            weight="font-normal"
                            className="text-sm place-self-start"
                          >
                            (Sales rep)
                          </Text>
                        </div>
                        <Link
                          to="mailto:solaadewumi@gmail.com"
                          className="text-sm"
                        >
                          solaadewumi@gmail.com
                        </Link>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-10 border rounded-b-lg space-y-10">
          {/* <Text weight="font-semibold">Subject: Request For Missing Fund</Text> */}
          <Text>{ticketDetails.message}</Text>
        </div>
      </div>

      {/* Admin Response Section */}
      <div className="flex flex-col rounded-lg mt-5">
        <div className="flex items-center justify-between bg-sec10 p-3 rounded-t-lg">
          <Text size="" weight="font-semibold" className="text-xl text-black">
            Admin
          </Text>
          <Text size="" color="primary1" weight="font-semibold" className="">
            2024-08-28 ~ 12:25PM
          </Text>
        </div>
        <div className="flex flex-col p-10 border rounded-b-lg space-y-10">
          <Text weight="font-semibold">Subject: Response For Missing Fund</Text>

          <Text>
            Admin Response: Please click on Forgot Password on the login page.
          </Text>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Tickets;

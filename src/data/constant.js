import OverviewImg from "../assets/overview.svg";
import CalendarImg from "../assets/CalendarDots.svg";
import profileicon from "../assets/profileicon.svg";
import stafficon from "../assets/stafficon.svg";
import taskicon from "../assets/taskicon.svg";
import noteicon from "../assets/noteicon.svg";
import subcategoryimg from "../assets/subcategory.svg";
import questionicon from "../assets/questionicon.svg";

export const steps = [
  {
    label: "Overview",
    link: "/overview",
    icon: OverviewImg,
    permission: "overView",
  },
  {
    label: "Leave",
    link: "/leave",
    icon: CalendarImg,
    permission: "userBase",
  },
  {
    label: "Task",
    link: "/task",
    icon: taskicon,
    permission: "subscription",
  },
  {
    label: "Profile",
    link: "/profile",
    icon: profileicon,
    permission: "transaction",
  },
  {
    label: "Staff",
    link: "/staff-view",
    icon: stafficon,
    permission: "supportTicket",
  },
  {
    label: "Anonymous Form",
    link: "/anonymous",
    icon: noteicon,
    permission: "withdrawal",
  },
  {
    label: "Training",
    link: "/training",
    icon: subcategoryimg,
    permission: "subcategory",
  },
];

export const lowerSteps = [
  {
    label: "Help Center",
    link: "/help-center",
    icon: questionicon,
  },
];

import ValidationScreen from "../screens/validationScreen";
import DashboardScreen from "../screens/dashboardScreen";
import AiBrainstormScreen from "../screens/aiBrainstormScreen";
import MyIdeasScreen from "../screens/myIdeasScreen";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getTabOptions } from "./tabOptions";

export const navData = [
  {
    name: "Dashboard",
    component: DashboardScreen,
    options: getTabOptions("Dashboard", Feather, "home"),
  },
  {
    name: "MyIdeas",
    component: MyIdeasScreen,
    options: getTabOptions("My Ideas", Feather, "list"),
  },
  {
    name: "Validation",
    component: ValidationScreen,
    options: getTabOptions("Validation", Feather, "bar-chart-2"),
  },
  // {
  //   name: "AIBrainstorm",
  //   component: AiBrainstormScreen,
  //   options: getTabOptions(
  //     "AI BrainStorm",
  //     MaterialCommunityIcons,
  //     "robot-outline"
  //   ),
  // },
];

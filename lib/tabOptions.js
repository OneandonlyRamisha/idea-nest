import { Text } from "react-native";
import { gStyles } from "./globalStyles";

export const getTabOptions = (label, IconComponent, iconName) => ({
  tabBarIcon: ({ focused }) => (
    <IconComponent
      name={iconName}
      size={20}
      color={!focused ? "#ffffff" : gStyles.accent}
    />
  ),
  tabBarLabel: ({ focused }) => (
    <Text
      style={{
        color: !focused ? "#ffffff" : gStyles.accent,
        fontSize: 12,
        fontFamily: "Inter-Regular",
      }}
    >
      {label}
    </Text>
  ),
});

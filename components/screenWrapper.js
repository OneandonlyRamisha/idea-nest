import { ScrollView } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function ScreenWrapper({ children }) {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: gStyles.background,
        borderTopColor: "#333",
        borderTopWidth: 1,
        padding: 20,
      }}
    >
      {children}
    </ScrollView>
  );
}

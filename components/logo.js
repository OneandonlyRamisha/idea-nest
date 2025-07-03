import { Text, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { gStyles } from "../lib/globalStyles";

export default function Logo() {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="lightbulb-circle"
        size={36}
        color={gStyles.accent}
        style={{ marginRight: 12 }}
      />
      <Text style={styles.title}>IdeaNest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
    fontWeight: 500,
    color: gStyles.textPrimary,
  },
});

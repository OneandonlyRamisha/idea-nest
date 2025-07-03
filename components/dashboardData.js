import { View, StyleSheet, Text } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function DashboardData({ title, icon, data, color }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
      <Text style={[styles.icon, { backgroundColor: color }]}>{icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.surface,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 24,

    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contentContainer: { gap: 12 },

  title: {
    color: gStyles.textSecondary,
    fontFamily: "Inter-Bold",
    fontSize: 24,
  },
  data: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Bold",
    fontSize: 54,
  },
  icon: {
    padding: 18,
    borderRadius: 12,
  },
});

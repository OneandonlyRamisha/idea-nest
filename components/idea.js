import { Text, View, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { gStyles } from "../lib/globalStyles";

const STATUS_COLORS = {
  new: gStyles.background,
  validated: gStyles.accent,
  "in-progress": gStyles.info,
  dropped: gStyles.error,
  launched: gStyles.success,
};

export default function IdeaComponent({
  title,
  categories,
  lastUpdated,
  status,
  favorite,
  onPress,
}) {
  const bgColor = STATUS_COLORS[status] || gStyles.success;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {favorite ? (
          <AntDesign name="star" size={24} color={gStyles.accent} />
        ) : (
          <AntDesign name="staro" size={24} color={gStyles.accent} />
        )}
      </View>
      <View style={styles.categories}>
        {categories.map((category) => (
          <Text
            style={styles.category}
            key={`${Date.now.toString()} ${category}`}
          >
            {category}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.updated}>{lastUpdated}</Text>
        <Text style={[styles.status, { backgroundColor: bgColor }]}>
          {status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.surface,
    borderColor: "#333333",
    elevation: 4,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  updated: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: gStyles.textSecondary,
  },
  status: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    backgroundColor: gStyles.success,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 1000,
    color: "#fff",
  },
  categories: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
  category: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: gStyles.card,
    borderColor: "#333",
    borderWidth: 1,
    elevation: 12,
    borderRadius: 1000,
    fontFamily: "Inter-Regular",
    color: "#fff",
  },
});

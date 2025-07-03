import { Pressable, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { gStyles } from "../lib/globalStyles";

export default function AddIdeaBtn({ onPress, title }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Entypo name="plus" size={24} color={gStyles.textOnButton} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.accent,
    gap: 10,
    borderRadius: 12,
    padding: 14,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: gStyles.textOnButton,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
});

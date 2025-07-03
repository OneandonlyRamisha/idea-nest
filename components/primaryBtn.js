import { Pressable, Text, StyleSheet } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function PrimaryBtn({ children, style, onPress }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.title, style]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  title: {
    color: gStyles.textSecondary,
    fontFamily: "Inter-Bold",
    fontSize: 16,
    textAlign: "center",
  },
});

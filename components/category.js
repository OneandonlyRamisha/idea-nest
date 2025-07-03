import { Pressable, Text, StyleSheet } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function Category({ onPress, children, style }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.title, style]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: gStyles.card,
    paddingVertical: 7,
    paddingHorizontal: 21,
    borderRadius: 12,
    color: "#fff",
    fontFamily: "Inter-Medium",
  },
});

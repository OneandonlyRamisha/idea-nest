import { Pressable, Text, StyleSheet } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function CategoryInput({ title, onPress, active }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={[styles.text, active]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  text: {
    backgroundColor: gStyles.card,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 1000,
    paddingVertical: 4,
    paddingHorizontal: 14,
    color: gStyles.textPrimary,
  },
});

import { Text, TextInput, View, StyleSheet } from "react-native";
import { gStyles } from "../lib/globalStyles";

export default function InputItems({
  label,
  placeHolder,
  multiline,
  value,
  onChangeText,
  input,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <TextInput
        placeholder={placeHolder}
        multiline={multiline}
        style={[styles.input, multiline ? { height: 150 } : undefined]}
        placeholderTextColor={gStyles.textSecondary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={input || "default"} // ← fallback
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  title: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  input: {
    backgroundColor: gStyles.surface,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlignVertical: "top",
    color: gStyles.textSecondary,
  },
});

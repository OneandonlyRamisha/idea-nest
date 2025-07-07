import { Modal, View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import { gStyles } from "../lib/globalStyles";
import { useIdeaItemContext } from "../store/ideaItem";
import { useEffect, useState } from "react";
import { validationInput } from "../lib/validationInput";
import InputItems from "./inputItems";
import PrimaryBtn from "./primaryBtn";
import { useSQLiteContext } from "expo-sqlite";
export default function HalfModal({
  visible,
  setVisible,
  currentIdea,
  editValidation,
  setEditValidation,
}) {
  const { setIdea } = useIdeaItemContext();
  const db = useSQLiteContext();

  const [formData, setFormData] = useState({
    completed: false,
    title: "",
    description: "",
    target: "",
    result: "",
    note: "",
  });

  useEffect(() => {
    if (editValidation) {
      setFormData({ ...editValidation });
    } else {
      setFormData({
        completed: false,
        title: "",
        description: "",
        target: "",
        result: "",
        note: "",
      });
    }
  }, [editValidation, visible]);

  const handleChange = (name, text) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
  };

  const handleSave = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.target ||
      !formData.result ||
      !formData.note
    ) {
      Alert.alert("All Fields Required", "Fill out all fields!", [
        { style: "cancel", text: "Okay" },
      ]);
      return;
    }

    const timestamp = Date.now();

    let updatedValidations;

    if (editValidation) {
      updatedValidations = currentIdea.validation.map((v) =>
        v.id === editValidation.id
          ? { ...v, ...formData, updatedAt: timestamp }
          : v
      );
    } else {
      const newValidation = {
        ...formData,
        id: timestamp.toString(),
        updatedAt: timestamp,
      };
      updatedValidations = [newValidation, ...currentIdea.validation];
    }

    setIdea((prev) =>
      prev.map((item) =>
        item.id === currentIdea.id
          ? { ...item, validation: updatedValidations }
          : item
      )
    );

    await db.runAsync(
      "UPDATE ideas SET validation = ?, updatedAt = ? WHERE id = ?",
      [JSON.stringify(updatedValidations), timestamp, currentIdea.id]
    );

    setVisible(false);
    setEditValidation(null);
  };

  const handleDelete = async () => {
    Alert.alert("Delete Validation", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updatedValidations = currentIdea.validation.filter(
            (v) => v.id !== editValidation.id
          );

          setIdea((prev) =>
            prev.map((item) =>
              item.id === currentIdea.id
                ? { ...item, validation: updatedValidations }
                : item
            )
          );

          await db.runAsync("UPDATE ideas SET validation = ? WHERE id = ?", [
            JSON.stringify(updatedValidations),
            currentIdea.id,
          ]);

          setVisible(false);
          setEditValidation(null);
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {editValidation ? "Edit Validation Step" : "Add Validation Step"}
        </Text>

        <View style={styles.inputContainer}>
          {validationInput.map((input) => (
            <InputItems
              key={input.name}
              placeHolder={input.placeholder}
              label={input.label}
              multiline={input.multiline}
              input={input.keyboardType}
              value={formData[input.name] || ""}
              onChangeText={(text) => handleChange(input.name, text)}
            />
          ))}
        </View>

        <View style={styles.btnContainer}>
          <PrimaryBtn style={styles.save} onPress={handleSave}>
            Save
          </PrimaryBtn>
          {editValidation && (
            <PrimaryBtn style={styles.delete} onPress={handleDelete}>
              Delete
            </PrimaryBtn>
          )}
          <PrimaryBtn
            style={styles.cancel}
            onPress={() => {
              setVisible(false);
              setEditValidation(null);
            }}
          >
            Cancel
          </PrimaryBtn>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.background,
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: gStyles.textPrimary,
    fontFamily: "Inter-Bold",
  },
  inputContainer: {
    gap: 30,
  },
  btnContainer: {
    gap: 15,
    marginBottom: 50,
    marginTop: 30,
  },
  save: {
    width: "100%",
    backgroundColor: gStyles.accent,
    color: gStyles.textOnButton,
  },
  delete: {
    width: "100%",
    backgroundColor: gStyles.error,
    color: "#fff",
  },
  cancel: {
    width: "100%",
    backgroundColor: "#333",
    color: gStyles.textPrimary,
  },
});

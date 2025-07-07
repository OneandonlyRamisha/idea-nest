import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { gStyles } from "../lib/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputItems from "./inputItems";
import { inputTypes } from "../lib/inputTypes";
import PrimaryBtn from "./primaryBtn";
import { useState, useEffect } from "react";
import { useIdeaItemContext } from "../store/ideaItem";
import { categoriesData } from "../lib/categoriesData";
import CategoryInput from "./categoryInput";
import { Picker } from "@react-native-picker/picker";
import { useSelectedIdeaIdContext } from "../store/selectedIdeaId";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";

export default function ModalComponent({
  visible,
  handleModalClick,
  editMode,
  setEditMode,
}) {
  const { idea, setIdea } = useIdeaItemContext();
  const { selectedIdeaId, setSelectedIdeaId } = useSelectedIdeaIdContext();
  const db = useSQLiteContext();

  const [formData, setFormData] = useState({
    favorite: false,
    category: [],
    status: "",
  });
  const isEditing = editMode !== null;
  const currentIdea = isEditing
    ? idea.find((item) => item.id === editMode)
    : null;

  useEffect(() => {
    if (currentIdea) {
      setFormData({
        id: currentIdea.id,
        title: currentIdea.title || "",
        problem: currentIdea.problem || "",
        solution: currentIdea.solution || "",
        audience: currentIdea.audience || "",
        businessModel: currentIdea.model || "",
        monetization: currentIdea.monetization || "",
        techStack: currentIdea.stack || "",
        notes: currentIdea.notes || "",
        status: currentIdea.status || "new",
        category: currentIdea.category,
        favorite: currentIdea.favorite,
        updatedAt: Date.now(),
      });
    }
  }, [currentIdea]);

  useEffect(() => {
    if (visible && !isEditing) {
      setFormData({
        title: "",
        problem: "",
        solution: "",
        audience: "",
        model: "",
        monetization: "",
        stack: "",
        notes: "",
        status: "",
        category: [],
        favorite: false,
      });
    }
  }, [visible, isEditing]);

  const handleChange = (name, text) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
  };

  const toggleFavorite = () => {
    setFormData((prev) => ({ ...prev, favorite: !prev.favorite }));
  };

  function handleCategoryPick(cat) {
    setFormData((prev) => {
      const isSelected = prev.category.includes(cat);
      return {
        ...prev,
        category: isSelected
          ? prev.category.filter((c) => c !== cat)
          : [...prev.category, cat],
      };
    });
  }

  // const handleSave = () => {
  //   if (!formData.title) {
  //     Alert.alert("Enter Title", "You must enter the title of the idea", [
  //       { style: "cancel", text: "Okay" },
  //     ]);
  //     return;
  //   }
  //   const timestamp = Date.now();

  //   if (isEditing && currentIdea) {
  //     setIdea((prev) =>
  //       prev.map((item) =>
  //         item.id === currentIdea.id
  //           ? { ...item, ...formData, updatedAt: timestamp }
  //           : item
  //       )
  //     );
  //   } else {
  //     const newIdea = {
  //       id: timestamp.toString(),
  //       validation: [],
  //       title: formData.title,
  //       problem: formData.problem || "",
  //       solution: formData.solution || "",
  //       audience: formData.audience || "",
  //       businessModel: formData.model || "",
  //       monetization: formData.monetization || "",
  //       techStack: formData.stack || "",
  //       notes: formData.notes || "",
  //       status: formData.status || "new",
  //       category: formData.category,
  //       favorite: formData.favorite,
  //       updatedAt: timestamp,
  //     };
  //     setIdea((prev) => [newIdea, ...prev]);
  //   }
  //   setEditMode(null);
  //   handleModalClick();
  // };

  const handleSave = async () => {
    if (!formData.title) {
      Alert.alert("Enter Title", "You must enter the title of the idea");
      return;
    }

    const timestamp = Date.now();

    if (isEditing && currentIdea) {
      const updatedIdea = {
        ...currentIdea,
        ...formData,
        updatedAt: timestamp,
      };

      setIdea((prev) =>
        prev.map((item) => (item.id === currentIdea.id ? updatedIdea : item))
      );

      await db.runAsync(
        `UPDATE ideas SET 
        title=?, problem=?, solution=?, audience=?, businessModel=?, monetization=?, 
        techStack=?, notes=?, status=?, category=?, favorite=?, updatedAt=?, validation=? 
       WHERE id=?`,
        [
          updatedIdea.title,
          updatedIdea.problem,
          updatedIdea.solution,
          updatedIdea.audience,
          updatedIdea.businessModel,
          updatedIdea.monetization,
          updatedIdea.techStack,
          updatedIdea.notes,
          updatedIdea.status,
          JSON.stringify(updatedIdea.category),
          updatedIdea.favorite ? 1 : 0,
          updatedIdea.updatedAt,
          JSON.stringify(updatedIdea.validation || []),
          updatedIdea.id,
        ]
      );
    } else {
      const newIdea = {
        id: timestamp.toString(),
        validation: [],
        title: formData.title,
        problem: formData.problem || "",
        solution: formData.solution || "",
        audience: formData.audience || "",
        businessModel: formData.model || "",
        monetization: formData.monetization || "",
        techStack: formData.stack || "",
        notes: formData.notes || "",
        status: formData.status || "new",
        category: formData.category,
        favorite: formData.favorite,
        updatedAt: timestamp,
      };

      setIdea((prev) => [newIdea, ...prev]);

      await db.runAsync(
        `INSERT INTO ideas (
        id, title, problem, solution, audience, businessModel, monetization,
        techStack, notes, status, category, favorite, updatedAt, validation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newIdea.id,
          newIdea.title,
          newIdea.problem,
          newIdea.solution,
          newIdea.audience,
          newIdea.businessModel,
          newIdea.monetization,
          newIdea.techStack,
          newIdea.notes,
          newIdea.status,
          JSON.stringify(newIdea.category),
          newIdea.favorite ? 1 : 0,
          newIdea.updatedAt,
          JSON.stringify([]),
        ]
      );
    }

    setEditMode(null);
    handleModalClick();
  };

  // function handleDelete() {
  //   Alert.alert("Delete Idea", "Are you sure you want to delete this idea?", [
  //     { text: "Cancel", style: "cancel" },
  //     {
  //       text: "Delete",
  //       style: "destructive",
  //       onPress: () => {
  //         setIdea((prev) => prev.filter((item) => item.id !== editMode));
  //         editMode === selectedIdeaId ? setSelectedIdeaId(null) : undefined;
  //         handleModalClick();
  //       },
  //     },
  //   ]);
  // }

  const handleDelete = async () => {
    Alert.alert("Delete Idea", "Are you sure you want to delete this idea?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIdea((prev) => prev.filter((item) => item.id !== editMode));
          await db.runAsync("DELETE FROM ideas WHERE id = ?", [editMode]);

          if (editMode === selectedIdeaId) {
            setSelectedIdeaId(null);
          }
          handleModalClick();
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleModalClick}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={gStyles.textSecondary}
            />
          </Pressable>
          <View style={{ flexDirection: "row", gap: 30 }}>
            {isEditing && (
              <Pressable onPress={handleDelete}>
                <FontAwesome name="trash-o" size={30} color={gStyles.error} />
              </Pressable>
            )}
            <Pressable onPress={toggleFavorite}>
              <AntDesign
                name={formData.favorite ? "star" : "staro"}
                size={30}
                color={
                  formData.favorite ? gStyles.accent : gStyles.textSecondary
                }
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          {inputTypes.map((input) => (
            <InputItems
              key={input.name}
              placeHolder={input.placeholder}
              label={input.label}
              multiline={input.multiline}
              value={formData[input.name] || ""}
              onChangeText={(text) => handleChange(input.name, text)}
            />
          ))}

          <View style={styles.field}>
            <Text style={styles.categoryLabel}>Status</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.status}
                onValueChange={(val) => handleChange("status", val)}
                mode="dropdown"
                style={styles.picker}
              >
                <Picker.Item label="New" value="new" />
                <Picker.Item label="Validated" value="validated" />
                <Picker.Item label="In-Progress" value="in-progress" />
                <Picker.Item label="Dropped" value="dropped" />
                <Picker.Item label="Launched" value="launched" />
              </Picker>
            </View>
          </View>

          <View>
            <Text style={styles.categoryLabel}>Categories</Text>
            <View style={styles.inputCategoryContainer}>
              {categoriesData.map((category) => {
                const isActive = formData.category.includes(category);
                return (
                  <CategoryInput
                    title={category}
                    key={category}
                    onPress={() => handleCategoryPick(category)}
                    active={isActive ? styles.activeCategory : undefined}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <PrimaryBtn style={styles.ctaBtn} onPress={handleSave}>
            Save
          </PrimaryBtn>
          <PrimaryBtn onPress={handleModalClick}>Cancel</PrimaryBtn>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gStyles.background,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    marginVertical: 30,
    gap: 45,
  },
  btnContainer: {
    paddingBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaBtn: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: gStyles.accent,
    color: gStyles.textOnButton,
  },
  categoryLabel: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  inputCategoryContainer: {
    backgroundColor: gStyles.surface,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlignVertical: "top",
    color: gStyles.textSecondary,
    height: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
    marginTop: 20,
  },
  activeCategory: {
    backgroundColor: gStyles.accent,
    color: gStyles.textOnButton,
  },
  pickerWrapper: {
    backgroundColor: gStyles.surface,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    marginTop: 20,
  },
  picker: {
    color: gStyles.textSecondary,
  },
});

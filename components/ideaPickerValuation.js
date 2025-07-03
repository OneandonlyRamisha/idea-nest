import { useIdeaItemContext } from "../store/ideaItem";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, Text } from "react-native";
import { gStyles } from "../lib/globalStyles";
import { useSelectedIdeaIdContext } from "../store/selectedIdeaId";

export default function IdeaPickerValuation() {
  const { idea } = useIdeaItemContext();
  const { selectedIdeaId, setSelectedIdeaId } = useSelectedIdeaIdContext();

  return (
    <View style={styles.field}>
      <Text style={styles.categoryLabel}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedIdeaId}
          onValueChange={(id) => setSelectedIdeaId(id)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Select an idea…" value={null} />
          {idea.map((i) => (
            <Picker.Item key={i.id} label={i.title} value={i.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

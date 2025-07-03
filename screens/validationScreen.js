import { Text, StyleSheet, View, Alert } from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import { gStyles } from "../lib/globalStyles";
import HalfModal from "../components/halfModal";
import IdeaPickerValuation from "../components/ideaPickerValuation";
import { useState } from "react";
import ProgressComponent from "../components/progressComponenet";
import AddIdeaBtn from "../components/addIdeaBtn";
import ValidationComponent from "../components/validationComponenet";
import { useIdeaItemContext } from "../store/ideaItem";
import { useSelectedIdeaIdContext } from "../store/selectedIdeaId";

export default function ValidationScreen() {
  const { selectedIdeaId, setSelectedIdeaId } = useSelectedIdeaIdContext();
  const [visible, setVisible] = useState(false);
  const [editValidation, setEditValidation] = useState(null);

  const { idea } = useIdeaItemContext();

  const currentIdea = idea.filter((data) => data.id === selectedIdeaId)[0];

  function handleAddValidation() {
    if (selectedIdeaId === null) {
      Alert.alert(
        "Select An Idea",
        "To add validation step, first you need to select and idea on which you want to add the step!",
        [{ style: "cancel", text: "Okay" }]
      );
      return;
    }
    setEditValidation(null);
    setVisible((prev) => !prev);
  }

  return (
    <ScreenWrapper>
      <Text style={styles.header}>Validation Tracker</Text>
      <Text style={styles.subHeader}>
        Track validation progress for your ideas
      </Text>
      <IdeaPickerValuation />
      <ProgressComponent selectedId={currentIdea} />
      <AddIdeaBtn title="Add Validation Step" onPress={handleAddValidation} />
      <View style={styles.body}>
        {selectedIdeaId === null
          ? undefined
          : currentIdea.validation.map((data) => (
              <ValidationComponent
                key={data.id}
                ideaData={data}
                setEditValidation={setEditValidation}
                setVisible={setVisible}
              />
            ))}
      </View>
      <HalfModal
        visible={visible}
        currentIdea={currentIdea}
        setVisible={setVisible}
        editValidation={editValidation}
        setEditValidation={setEditValidation}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: gStyles.textPrimary,
    marginBottom: 12,
  },
  subHeader: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    color: gStyles.textSecondary,
  },
  body: {
    marginTop: 24,
    marginBottom: 50,
    gap: 20,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { gStyles } from "../lib/globalStyles";
import { useIdeaItemContext } from "../store/ideaItem";

export default function ProgressComponent({ selectedId }) {
  const { idea } = useIdeaItemContext();

  const totalValidations = selectedId?.validation?.length || 0;

  const completedValidations =
    selectedId?.validation?.filter((v) => v.completed)?.length || 0;

  const percentCompleted = (
    (completedValidations / totalValidations) *
    100
  ).toFixed(0);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Progress</Text>
        <Text
          style={styles.subTitle}
        >{`${completedValidations} of ${totalValidations} completed`}</Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressIndicator, { width: `${percentCompleted}%` }]}
        ></View>
      </View>
      <Text style={styles.progressPercent}>{percentCompleted}% Complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    gap: 20,
    backgroundColor: gStyles.surface,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Semi-Bold",
    fontSize: 20,
  },
  subTitle: {
    color: gStyles.textSecondary,
    fontFamily: "Inter-Regular",
  },
  progressBar: {
    height: 15,
    width: "100%",
    borderRadius: 1000,
    backgroundColor: "#333",
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: gStyles.accent,
    borderRadius: 1000,
  },
  progressPercent: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    color: gStyles.textSecondary,
  },
});

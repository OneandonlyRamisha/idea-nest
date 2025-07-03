import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { gStyles } from "../lib/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import PrimaryBtn from "./primaryBtn";
import { useIdeaItemContext } from "../store/ideaItem";
import formatTimeAgo from "../lib/timeCalc";
import { useSelectedIdeaIdContext } from "../store/selectedIdeaId";

export default function ValidationComponent({
  ideaData,

  setVisible,
  setEditValidation,
}) {
  const { setIdea } = useIdeaItemContext();
  const { selectedIdeaId, setSelectedIdeaId } = useSelectedIdeaIdContext();

  const toggleCompleted = () => {
    setIdea((prev) =>
      prev.map((idea) =>
        idea.id === selectedIdeaId
          ? {
              ...idea,
              validation: idea.validation.map((v) =>
                v.id === ideaData.id ? { ...v, completed: !v.completed } : v
              ),
            }
          : idea
      )
    );
  };

  return (
    <View style={styles.container}>
      {ideaData.completed ? (
        <Text style={styles.completed}>Completed</Text>
      ) : undefined}
      <View style={styles.header}>
        <Pressable onPress={toggleCompleted}>
          {ideaData.completed ? (
            <AntDesign name="checkcircleo" style={styles.icon} />
          ) : (
            <MaterialCommunityIcons name="circle-outline" style={styles.icon} />
          )}
        </Pressable>
        <Text style={styles.title}>{ideaData.title}</Text>
      </View>
      <Text style={styles.ideaName}>Ai Marketing Shit</Text>
      <Text style={styles.description}>{ideaData.description} </Text>

      <View style={styles.goalContainer}>
        <Feather name="target" size={18} color={gStyles.textPrimary} />
        <Text style={styles.progressTitle}>
          Progress: {`${ideaData.result} / ${ideaData.target}  `}
        </Text>
      </View>
      <Text style={styles.notes}>{ideaData.note}</Text>
      <View style={styles.footer}>
        <View style={styles.createdAt}>
          <AntDesign name="calendar" size={16} color={gStyles.textSecondary} />
          <Text style={styles.created}>
            {formatTimeAgo(ideaData.updatedAt)}
          </Text>
        </View>
        <PrimaryBtn
          style={styles.edit}
          onPress={() => {
            setEditValidation(ideaData);
            setVisible(true);
          }}
        >
          Edit
        </PrimaryBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.surface,
    padding: 30,
    borderRadius: 12,
    elevation: 4,
    position: "relative",
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    color: gStyles.textSecondary,
    fontSize: 22,
  },
  title: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  completed: {
    backgroundColor: gStyles.success,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "#fff",
    fontFamily: "Inter-Medium",
    borderRadius: 1000,
    fontSize: 11,
    position: "absolute",
    alignSelf: "center",
    top: -10,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  edit: {
    backgroundColor: gStyles.textSecondary,
    borderRadius: 100,
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 12,
    fontFamily: "Inter-Medium",

    color: gStyles.textPrimary,
  },
  ideaName: {
    color: gStyles.textSecondary,
    fontFamily: "Inter-Regular",
  },
  description: {
    color: gStyles.textPrimary,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    lineHeight: 24,
  },
  progressTitle: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Regular",
    marginVertical: 16,
  },
  notes: {
    color: gStyles.textPrimary,
    fontFamily: "Inter-Regular",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createdAt: {
    flexDirection: "row",
    fontFamily: "Inter-Regular",
    alignItems: "center",
    gap: 7,
  },
  created: {
    color: gStyles.textSecondary,
  },
});

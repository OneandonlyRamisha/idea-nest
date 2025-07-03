import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import { useDashboardData } from "../lib/dataGetter";
import DashboardData from "../components/dashboardData";
import AddIdeaBtn from "../components/addIdeaBtn";
import { useNavigation } from "@react-navigation/native";
import { gStyles } from "../lib/globalStyles";
import { useIdeaItemContext } from "../store/ideaItem";
import IdeaComponent from "../components/idea";
import formatTimeAgo from "../lib/timeCalc";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DashboardScreen() {
  const dashBoardData = useDashboardData();
  const navigation = useNavigation();
  const { idea } = useIdeaItemContext();

  const sortedIdeaList = [...idea].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <ScreenWrapper>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {dashBoardData.map((item) => (
          <View
            key={item.name}
            style={[styles.slide, { width: SCREEN_WIDTH - 40 }]}
          >
            <DashboardData
              title={item.name}
              data={item.data}
              icon={item.icon}
              color={item.color}
            />
          </View>
        ))}
      </ScrollView>
      <AddIdeaBtn
        title={"Add New Idea"}
        onPress={() => navigation.navigate("MyIdeas", { openModal: true })}
      />
      <View style={styles.recentIdeasContainer}>
        <Text style={styles.text}>Recent Ideas</Text>
        {sortedIdeaList.length < 1 ? (
          <Text style={{ color: gStyles.textPrimary, marginTop: 12 }}>
            No Recent Ideas
          </Text>
        ) : (
          sortedIdeaList
            .slice(0, 4)
            .map((idea) => (
              <IdeaComponent
                key={idea.id}
                favorite={idea.favorite}
                title={idea.title}
                categories={idea.category}
                lastUpdated={formatTimeAgo(idea.updatedAt)}
                status={idea.status}
                onPress={() =>
                  navigation.navigate("MyIdeas", { editMode: idea.id })
                }
              />
            ))
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  slide: {
    marginRight: 0,
  },
  recentIdeasContainer: {
    marginVertical: 24,
    marginBottom: 40,
    gap: 20,
  },
  text: {
    fontSize: 24,
    color: gStyles.textPrimary,
    fontFamily: "Inter-Bold",
  },
});

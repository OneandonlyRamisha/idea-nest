import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import ScreenWrapper from "../components/screenWrapper";
import AddIdeaBtn from "../components/addIdeaBtn";
import { useState } from "react";
import { useIdeaItemContext } from "../store/ideaItem";
import ModalComponent from "../components/modal";
import IdeaComponent from "../components/idea";
import { categoriesData } from "../lib/categoriesData";
import Category from "../components/category";
import { gStyles } from "../lib/globalStyles";
import formatTimeAgo from "../lib/timeCalc";
import React from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function MyIdeasScreen() {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const { idea } = useIdeaItemContext();
  const [activeFilter, setActiveFIlter] = useState("All");

  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.openModal) {
        setVisible(true);
        navigation.setParams({ openModal: false });
      }
    }, [route.params])
  );

  useFocusEffect(
    React.useCallback(() => {
      const id = route.params?.editMode;
      if (id) {
        setVisible(true);
        setEditMode(id);
        navigation.setParams({ editMode: null });
      }
    }, [route.params?.editMode])
  );

  function handleModalClick() {
    setVisible((prev) => !prev);
  }

  function handleFilterClick(item) {
    setActiveFIlter(item);
  }

  function closeModal() {
    setVisible(false);
    setEditMode(null);
  }
  function handleIdeaClick(id) {
    const currentIdea = idea.filter((ideaData) => ideaData.id === id);
    setEditMode(currentIdea[0].id);
    setVisible(true);
  }

  return (
    <ScreenWrapper>
      <ModalComponent
        visible={visible}
        handleModalClick={closeModal}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <ScrollView
        contentContainerStyle={styles.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((category) => (
          <Category
            key={category}
            onPress={() => handleFilterClick(category)}
            style={activeFilter === category ? styles.active : undefined}
          >
            {category}
          </Category>
        ))}
      </ScrollView>
      <View>
        <AddIdeaBtn onPress={handleModalClick} title="Add New Idea" />
      </View>
      <View style={styles.body}>
        {idea.length < 1 ? (
          <Text style={styles.noIdeasText}>
            You Have No Idea Yet. Add One!!!
          </Text>
        ) : activeFilter === "All" ? (
          idea.map((ideaData) => (
            <IdeaComponent
              title={ideaData.title}
              favorite={ideaData.favorite}
              categories={ideaData.category}
              status={ideaData.status}
              lastUpdated={formatTimeAgo(ideaData.updatedAt)}
              key={ideaData.id}
              onPress={() => handleIdeaClick(ideaData.id)}
            />
          ))
        ) : (
          idea
            .filter((i) => i.category.includes(activeFilter))
            .map((ideaData) => (
              <IdeaComponent
                title={ideaData.title}
                favorite={ideaData.favorite}
                categories={ideaData.category}
                status={ideaData.status}
                lastUpdated={formatTimeAgo(ideaData.updatedAt)}
                key={ideaData.id}
                onPress={() => handleIdeaClick(ideaData.id)}
              />
            ))
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "red",
  },
  noIdeasText: {
    color: gStyles.textPrimary,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  body: {
    gap: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  categories: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  active: {
    backgroundColor: gStyles.accent,
    color: gStyles.textOnButton,
  },
});

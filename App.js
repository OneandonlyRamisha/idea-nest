import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "./components/logo";
import { useFonts } from "expo-font";
import { gStyles } from "./lib/globalStyles";
import { IdeaItemProvider } from "./store/ideaItem";
import { navData } from "./lib/navData";
import { SelectedIdeaIdProvider } from "./store/selectedIdeaId";
import { SQLiteProvider } from "expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { useIdeaItemContext } from "./store/ideaItem";

const Tab = createBottomTabNavigator();

function InitIdeasFromDB({ children }) {
  const db = useSQLiteContext();
  const { setIdea } = useIdeaItemContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      const result = await db.getAllAsync("SELECT * FROM ideas");
      const parsed = result.map((item) => ({
        ...item,
        category: JSON.parse(item.category || "[]"),
        validation: JSON.parse(item.validation || "[]"),
        favorite: item.favorite === 1,
      }));
      setIdea(parsed);
    };
    fetchIdeas();
  }, []);

  return children;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Semi-Bold": require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-Light": require("./assets/fonts/Inter_18pt-Light.ttf"),
    "Inter-Black": require("./assets/fonts/Inter_18pt-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <SQLiteProvider
        databaseName="ideas.db"
        onInit={async (db) => {
          await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ideas (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        problem TEXT,
        solution TEXT,
        audience TEXT,
        businessModel TEXT,
        monetization TEXT,
        techStack TEXT,
        notes TEXT,
        status TEXT,
        category TEXT,
        favorite INTEGER,
        updatedAt INTEGER,
        validation TEXT
      );
      PRAGMA journal_mode=WAL;
      `);
        }}
      >
        <IdeaItemProvider>
          <InitIdeasFromDB>
            <SelectedIdeaIdProvider>
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={{
                    headerTitle: () => null,
                    headerLeft: () => <Logo />,
                    headerStyle: {
                      backgroundColor: gStyles.background,
                    },
                    tabBarStyle: {
                      backgroundColor: gStyles.surface,
                      borderTopWidth: 0,
                    },
                  }}
                >
                  {navData.map((data) => (
                    <Tab.Screen
                      key={data.name}
                      name={data.name}
                      component={data.component}
                      options={data.options}
                    />
                  ))}
                </Tab.Navigator>
              </NavigationContainer>
            </SelectedIdeaIdProvider>
          </InitIdeasFromDB>
        </IdeaItemProvider>
      </SQLiteProvider>
    </>
  );
}

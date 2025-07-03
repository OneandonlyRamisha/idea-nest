import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "./components/logo";
import { useFonts } from "expo-font";
import { gStyles } from "./lib/globalStyles";
import { IdeaItemProvider } from "./store/ideaItem";
import { navData } from "./lib/navData";
import { SelectedIdeaIdProvider } from "./store/selectedIdeaId";

const Tab = createBottomTabNavigator();

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
      <IdeaItemProvider>
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
      </IdeaItemProvider>
    </>
  );
}

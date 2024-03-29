import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen.js";
import ShopScreen from "./screens/ShopScreen.js";
import PlanningScreen from "./screens/PlanningScreen.js";
import ParametersScreen from "./screens/ParametersScreen.js";
import RegimeScreen from "./screens/RegimeScreen.js";
import GoutsScreen from "./screens/GoutsScreen.js";
import AffichageScreen from "./screens/AffichageScreen.js";
import FavStoreScreen from "./screens/FavStoreScreen.js";
import ConnexionScreen from "./screens/ConnexionScreen.js";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user.js";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Planning") {
            iconName = "calendar";
          } else if (route.name === "Shop") {
            iconName = "shopping-cart";
          } else if (route.name === "Parameters") {
            iconName = "gear";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#CC3F0C",
        tabBarActiveBackgroundColor: "#AF2908",
        tabInactiveBackgroundColor: "#CC3F0C",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Planning" component={PlanningScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Parameters" component={ParametersScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Anton-reg": require("./assets/fonts/Anton-Regular.ttf"),
    "Ops-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "Ops-reg": require("./assets/fonts/OpenSans-Regular.ttf"),
    "Ops-medium": require("./assets/fonts/OpenSans-Medium.ttf"),
    "Ops-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Ops-extrabold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Connexion" component={ConnexionScreen} />
          <Stack.Screen name="Regime" component={RegimeScreen} />
          <Stack.Screen name="Gouts" component={GoutsScreen} />
          <Stack.Screen name="Affichage" component={AffichageScreen} />
          <Stack.Screen name="FavStore" component={FavStoreScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

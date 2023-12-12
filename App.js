import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen.js";
import ShopScreen from "./screens/ShopScreen.js";
import PlanningScreen from "./screens/PlanningScreen.js";
import NoPlanningScreen from "./screens/NoPlanningScreen.js";
import ParametersScreen from "./screens/ParametersScreen.js";
import RegimeScreen from "./screens/RegimeScreen.js";
import GoutsScreen from "./screens/GoutsScreen.js";
import AffichageScreen from "./screens/AffichageScreen.js";
import FavStoreScreen from "./screens/FavStoreScreen.js";
import ConnexionScreen from "./screens/ConnexionScreen.js";

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
  <Tab.Screen name="Planning" component={NoPlanningScreen} />
  <Tab.Screen name="Shop" component={ShopScreen} />
  <Tab.Screen name="Parameters" component={ParametersScreen} />
</Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Connexion" component={ConnexionScreen} /> */}
        <Stack.Screen name="Regime" component={RegimeScreen} />
        <Stack.Screen name="Gouts" component={GoutsScreen} />
        <Stack.Screen name="Affichage" component={AffichageScreen} />
        <Stack.Screen name="FavStore" component={FavStoreScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


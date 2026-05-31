import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen.js";
import WebshopScreen from "./screens/WebshopScreen.js";
import ProductDetailsScreen from "./screens/ProductDetailsScreen.js";
import NewsDetailsScreen from "./screens/NewsDetailsScreen.js";
import CampusDetailsScreen from "./screens/CampusDetailsScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Webshop"
          component={WebshopScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CampusDetails"
          component={CampusDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
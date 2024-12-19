import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BMIScreen from "./BMIScreen";
import ExplainScreen from "./ExplainScreen";
import HistoryScreen from "./HistoryScreen";
import AuthorScreen from "./AuthorScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BMIScreen" component={BMIScreen} options={{ title: "BMI Calculator" }} />
        <Stack.Screen name="ExplainScreen" component={ExplainScreen} options={{ title: "Explanation" }} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: "Calculation History" }} />
        <Stack.Screen name="AuthorScreen" component={AuthorScreen} options={{ title: "About Author" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

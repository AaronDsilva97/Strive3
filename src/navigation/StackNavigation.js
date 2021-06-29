import React from "react";
import Home from "../screens/HomeScreen";
import AddTask from "../screens/AddtaskScreen";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//  Funtion Start From Here--------------------------
export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Task Add" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

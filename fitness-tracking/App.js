import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";

import TrackingScreen from "./src/screens/TrackingScreen";
import RankingScreen from "./src/screens/RankingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegionScreen from "./src/screens/RegionScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Tracking") iconName = "timer";
            else if (route.name === "Ranking") iconName = "podium";
            else if (route.name === "Profile") iconName = "person";
            else if (route.name === "Region") iconName = "location";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ff69b4",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#1a1a1a", borderTopWidth: 0 },
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerTitleStyle: { color: "#ff69b4" },
        })}
      >
        <Tab.Screen name="Tracking" component={TrackingScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Region" component={RegionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

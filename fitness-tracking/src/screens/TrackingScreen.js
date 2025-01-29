import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TrackingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tracking Screen</Text>
    </View>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark Theme Background
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ff69b4", // Pink Text Color
    fontSize: 20,
    fontWeight: "bold",
  },
});

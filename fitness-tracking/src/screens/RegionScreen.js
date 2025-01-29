import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RegionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Region Screen</Text>
    </View>
  );
};

export default RegionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ff69b4",
    fontSize: 20,
    fontWeight: "bold",
  },
});

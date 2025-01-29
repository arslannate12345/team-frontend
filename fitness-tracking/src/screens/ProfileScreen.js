import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;

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

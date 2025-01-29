import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTracking } from "../context/TrackingContext"; // Import the context

const RankingScreen = () => {
  const { trackingData } = useTracking(); // Access the tracking data from context

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ranking</Text>
      {trackingData.length === 0 ? (
        <Text style={styles.noDataText}>No tracking data yet.</Text>
      ) : (
        <FlatList
          data={trackingData}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                Tracking {index + 1}: {item} seconds
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  heading: {
    color: "#FF4081",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noDataText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#333",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RankingScreen;

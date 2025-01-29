import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";

const RankingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [rankings, setRankings] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("all");

  useEffect(() => {
    loadRankings();
  }, []);

  useEffect(() => {
    saveRankings();
  }, [rankings]);

  useEffect(() => {
    if (route.params?.elapsedTime) {
      const newRanking = {
        time: route.params.elapsedTime,
        date: new Date().toLocaleDateString(),
        id: Date.now(),
      };

      setRankings((prevRankings) => {
        const updatedRankings = [...prevRankings, newRanking];
        return updatedRankings.sort(
          (a, b) => parseFloat(a.time) - parseFloat(b.time)
        );
      });
    }
  }, [route.params?.elapsedTime]);

  const saveRankings = async () => {
    try {
      const jsonValue = JSON.stringify(rankings);
      await AsyncStorage.setItem("rankings", jsonValue);
    } catch (error) {
      console.error("Error saving rankings:", error);
    }
  };

  const loadRankings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("rankings");
      if (jsonValue !== null) {
        setRankings(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Error loading rankings:", error);
    }
  };

  const filterRankings = () => {
    const now = new Date();
    let filtered = rankings;

    if (selectedTimeFrame === "week") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = rankings.filter(
        (ranking) => new Date(ranking.date) >= oneWeekAgo
      );
    } else if (selectedTimeFrame === "month") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filtered = rankings.filter(
        (ranking) => new Date(ranking.date) >= oneMonthAgo
      );
    }
    return filtered.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ranking</Text>
      </View>

      <View style={styles.timeFrame}>
        {["week", "month", "all"].map((timeFrame) => (
          <TouchableOpacity
            key={timeFrame}
            style={[
              styles.timeFrameButton,
              selectedTimeFrame === timeFrame && styles.timeFrameButtonActive,
            ]}
            onPress={() => setSelectedTimeFrame(timeFrame)}
          >
            <Text style={styles.timeFrameButtonText}>
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.rankingInfo}>
        <View style={styles.rankingPlace}>
          <Text style={styles.rankingNumber}>#2</Text>
          <Text style={styles.rankingLabel}>Ranking</Text>
        </View>
        <View style={styles.totalRankings}>
          <Text style={styles.totalNumber}>#154202</Text>
          <Text style={styles.totalLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.region}>
        <Text style={styles.regionText}>Region</Text>
        <Text style={styles.regionText}>Worldwide</Text>
      </View>

      <ScrollView style={styles.rankingList}>
        {filterRankings().map((ranking, index) => (
          <TouchableOpacity
            key={ranking.id}
            style={styles.rankingItem}
            onPress={() => {
              // Handle navigation or other actions when an item is pressed
              console.log("Pressed item:", ranking);
            }}
          >
            <Text style={styles.rankingItemIndex}>{index + 1}.</Text>
            <View style={styles.rankingItemDetails}>
              <Text style={styles.rankingItemName}>
                New Tracking {index + 1}
              </Text>
              <Text style={styles.rankingItemDate}>{ranking.date}</Text>
            </View>
            <Text style={styles.rankingItemTime}>{ranking.time} sec</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "#FF4081", // Pink title
    fontSize: 28,
    fontWeight: "bold",
  },
  timeFrame: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  timeFrameButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  timeFrameButtonActive: {
    backgroundColor: "#FF4081",
    borderColor: "#FF4081",
  },
  timeFrameButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  rankingInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  rankingPlace: {
    alignItems: "center",
  },
  rankingNumber: {
    color: "#FF4081",
    fontSize: 32,
    fontWeight: "bold",
  },
  rankingLabel: {
    color: "#FFF",
    fontSize: 16,
  },
  totalRankings: {
    alignItems: "center",
  },
  totalNumber: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  totalLabel: {
    color: "#FFF",
    fontSize: 16,
  },
  region: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  regionText: {
    color: "#FFF",
    fontSize: 16,
  },
  rankingList: {
    flex: 1,
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  rankingItemIndex: {
    color: "#888",
    fontSize: 16,
    marginRight: 10,
  },
  rankingItemDetails: {
    flex: 1,
  },
  rankingItemName: {
    color: "#FFF",
    fontSize: 16,
  },
  rankingItemDate: {
    color: "#888",
    fontSize: 14,
  },
  rankingItemTime: {
    color: "#FF4081",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "auto",
  },
});

export default RankingScreen;

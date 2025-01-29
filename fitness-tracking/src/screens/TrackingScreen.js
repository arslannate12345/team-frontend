import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For stop icon

const TrackingScreen = () => {
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (tracking) {
      timer = setInterval(() => {
        setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
      }, 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [tracking, startTime]);

  const handleStartTracking = () => {
    setTracking(true);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleStopTracking = () => {
    setTracking(false);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {!tracking ? (
        <>
          {/* "Tap to start recording" Text */}
          <Text style={styles.startText}>Tap to start recording</Text>

          {/* Start Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartTracking}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.heading}>New Tracking 1</Text>
          <Text style={styles.timer}>{elapsedTime} sec</Text>

          {/* Stop Button */}
          <TouchableOpacity
            style={styles.stopButton}
            onPress={handleStopTracking}
          >
            <MaterialIcons name="stop" size={32} color="white" />
          </TouchableOpacity>
        </>
      )}

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              🎉 Congratulations! Your tracking time is {elapsedTime} seconds.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark mode background
    alignItems: "center",
    justifyContent: "center",
  },
  startText: {
    color: "#FF4081",
    fontSize: 18,
    marginBottom: 20,
  },
  heading: {
    color: "#FF4081", // Pink theme
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timer: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#FF4081", // Pink theme
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5, // Outline
    borderColor: "grey", // White outline
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  stopButton: {
    width: 70,
    height: 70,
    backgroundColor: "#FF4081", // Red for stop button
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 5, // Outline
    borderColor: "grey", // White outline
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "40%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#FF4081",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default TrackingScreen;

// src/context/TrackingContext.js
import React, { createContext, useState, useContext } from "react";

const TrackingContext = createContext();

export const useTracking = () => {
  return useContext(TrackingContext);
};

export const TrackingProvider = ({ children }) => {
  const [trackingData, setTrackingData] = useState([]);

  const addTrackingData = (time) => {
    setTrackingData((prevData) => [...prevData, time]);
  };

  return (
    <TrackingContext.Provider value={{ trackingData, addTrackingData }}>
      {children}
    </TrackingContext.Provider>
  );
};

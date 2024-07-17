import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path as per your directory structure
import './Notification.css'; // Import your CSS file
import { FaRegMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const thresholds = {
    humidity: { min: 30, max: 70 },
    rain: { min: 0, max: 100 },
    soilmoisture: { min: 20, max: 80 },
    sunlight: { min: 0, max: 100 },
    temperature: { min: 15, max: 30 },
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      const userRef = ref(database, `users/${storedUserId}`);

      get(child(userRef, 'sensorReadings')).then((snapshot) => {
        if (snapshot.exists()) {
          const sensorReadings = snapshot.val();
          const latestTimestamp = Object.keys(sensorReadings).sort().pop();
          const latestData = sensorReadings[latestTimestamp];
          
          const newNotifications = [];

          for (let sensor in latestData) {
            if (thresholds[sensor]) { // Check if sensor exists in thresholds
              if (latestData[sensor] < thresholds[sensor].min) {
                newNotifications.push(
                  `Alert: ${sensor} reading ${latestData[sensor]} at time ${latestTimestamp} is too low!`
                );
              } else if (latestData[sensor] > thresholds[sensor].max) {
                newNotifications.push(
                  `Alert: ${sensor} reading ${latestData[sensor]} at time ${latestTimestamp} is too high!`
                );
              }
            } else {
              console.warn(`No thresholds defined for sensor: ${sensor}`);
            }
          }

          if (newNotifications.length > 0) {
            setNotifications(newNotifications);
          } else {
            setNotifications(["No alerts"]);
          }
        } else {
          console.log("No sensor data available");
          setNotifications(["No alerts"]);
        }
      }).catch((error) => {
        console.error("Error fetching sensor readings:", error);
        setNotifications(["Error fetching sensor readings"]);
      });
    }
  }, []);

  return (
    <div className="notification-container">
      <h3><IoIosNotifications /></h3>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <p key={index} className="notification-message alert">{notification}</p>
        ))
      ) : (
        <p className="notification-message">No alerts</p>
      )}
    </div>
  );
};

export default Notification;

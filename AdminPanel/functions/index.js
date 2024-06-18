const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendAlert = functions.database
    .ref("/users/{userId}/sensorReadings/{readingId}")
    .onWrite((change, context) => {
      const newValue = change.after.val();

      // Check conditions
      const highTemp = newValue.temperature > 30; // example threshold
      const lowMoisture = newValue.soilmoisture < 20; // example threshold

      if (highTemp || lowMoisture) {
        const payload = {
          notification: {
            title: "Alert",
            body: `High temperature or low moisture detected! Temp: ${newValue.temperature}, Moisture: ${newValue.soilmoisture}`,
          },
        };

        // Send notification
        return admin.messaging().sendToTopic("alerts", payload)
            .then((response) => {
              console.log("Notification sent successfully:", response);
              return null;
            })
            .catch((error) => {
              console.error("Error sending notification:", error);
              return null;
            });
      }

      return null;
    });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const firestore = admin.firestore();
const messaging = admin.messaging();

/**
 * Cloud Function triggered by new sensor data.
 * Sends a notification if temperature is too high or soil moisture is too low.
 *
 * @param {Object} snapshot - The snapshot of the newly added data.
 * @param {Object} context - The event context.
 * @return {Promise} - A promise indicating the completion of the function.
 */
exports.sendAlertNotification = functions.database.ref("/sensorData/{documentId}")
    .onCreate(async (snapshot, context) => {
      const data = snapshot.val();

      // Define your thresholds
      const tempThreshold = 30; // Temperature threshold
      const soilMoistureThreshold = 20; // Soil moisture threshold

      let alertMessage = "";
      if (data.temperature > tempThreshold) {
        alertMessage += `High temperature detected: ${data.temperature}°C. `;
      }
      if (data.soilMoisture < soilMoistureThreshold) {
        alertMessage += `Low soil moisture detected: ${data.soilMoisture}%. `;
      }
      if (data.rain === true) {
        alertMessage += `Rain detected. `;
      }

      if (alertMessage) {
        const payload = {
          notification: {
            title: "Sensor Alert",
            body: alertMessage,
          },
        };

        // Fetch tokens from Firestore
        const tokens = await getTokens();
        if (tokens.length) {
          const response = await messaging.sendToDevice(tokens, payload);
          console.log("Notification sent:", response);
        } else {
          console.log("No tokens found for users.");
        }

        // Save notification to Firestore
        await firestore.collection("notifications").add({
          message: alertMessage,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      return null;
    });

/**
 * Get the FCM tokens from Firestore.
 *
 * @return {Promise<string[]>} - A promise that resolves with the FCM tokens.
 */
async function getTokens() {
  const tokens = [];
  const userSnapshots = await firestore.collection("users").get();
  userSnapshots.forEach((doc) => {
    const userData = doc.data();
    if (userData.fcmToken) {
      tokens.push(userData.fcmToken);
    }
  });
  return tokens;
}

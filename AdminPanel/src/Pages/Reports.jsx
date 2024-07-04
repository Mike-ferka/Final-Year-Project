// Report.js
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import './Reports.css';

const Reports = () => {
    const [sensorData, setSensorData] = useState({});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch sensor data
        const sensorRef = ref(database, 'sensorData');
        const unsubscribeSensor = onValue(sensorRef, (snapshot) => {
            const data = snapshot.val();
            setSensorData(data || {});
        });

        // Fetch notifications
        const notificationsRef = ref(database, 'notifications');
        const unsubscribeNotifications = onValue(notificationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notificationsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setNotifications(notificationsArray);
            } else {
                setNotifications([]);
            }
        });

        // Cleanup subscriptions on unmount
        return () => {
            unsubscribeSensor();
            unsubscribeNotifications();
        };
    }, []);

    return (
        <div className="report-container">
            <h1>Weather Station Report</h1>

            <section className="sensor-section">
                <h2>Sensor Data</h2>
                <ul className="sensor-list">
                    {Object.keys(sensorData).length > 0 ? (
                        Object.keys(sensorData).map(sensorId => (
                            <li key={sensorId} className="sensor-item">
                                <h3>Sensor ID: {sensorId}</h3>
                                <p>Temperature: {sensorData[sensorId].temperature}°C</p>
                                <p>Humidity: {sensorData[sensorId].humidity}%</p>
                                <p>Soil Moisture: {sensorData[sensorId].soilMoisture}%</p>
                            </li>
                        ))
                    ) : (
                        <p>No sensor data available.</p>
                    )}
                </ul>
            </section>

            <section className="notifications-section">
                <h2>Notifications</h2>
                <ul className="notifications-list">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <li key={notification.id} className="notification-item">
                                <p>{notification.message}</p>
                                <p><small>{new Date(notification.timestamp).toLocaleString()}</small></p>
                            </li>
                        ))
                    ) : (
                        <p>No notifications available.</p>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default Reports;

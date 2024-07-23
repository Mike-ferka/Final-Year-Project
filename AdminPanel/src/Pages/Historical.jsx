import React from 'react'
import './Historical.css'
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill
} from 'react-icons/bs';
import { CiTempHigh } from "react-icons/ci";
import { WiDayRainMix, WiBarometer, WiHail } from "react-icons/wi";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
 import { useEffect, useState } from "react";
import { ref, get, child,set } from "firebase/database";
import { database } from "../firebase"; // Adjust the path as per your directory structure
import { CSVLink } from "react-csv";



function Historical() {
  const [sensorData, setSensorData] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState({});
  const [deviceStatus, setDeviceStatus] = useState({});
  const [userId, setUserId] = useState(null);
  const [cropYields, setCropYields] = useState({});
  const [cropType, setCropType] = useState("");
  const [estimatedYield, setEstimatedYield] = useState("");
  const [season, setSeason] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const userRef = ref(database, `users/${userId}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userDevices = snapshot.val();
          setDeviceLocation(userDevices.DeviceLocation || {});
          setDeviceStatus(userDevices.SensorStatus || {});
          setCropYields(userDevices.cropYields || {});
          const readings = userDevices.sensorReadings 
            ? Object.keys(userDevices.sensorReadings).map(key => ({
                ...userDevices.sensorReadings[key],
                timestamp: key
              }))
            : [];
          setSensorData(readings);
        }
      }).catch((error) => {
        console.error("Error fetching user devices:", error);
      });
    }
  }, [userId]);

  const handleCropTypeChange = (e) => {
    setCropType(e.target.value);
  };

  const handleEstimatedYieldChange = (e) => {
    setEstimatedYield(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleSaveCropYield = () => {
    if (userId && cropType && season) {
      const path = `users/${userId}/cropYields/${season}/${cropType}`;
      set(ref(database, path), estimatedYield)
        .then(() => {
          setCropYields({ ...cropYields, [season]: { ...cropYields[season], [cropType]: estimatedYield } });
          setCropType("");
          setEstimatedYield("");
          setSeason("");
        })
        .catch((error) => {
          console.error("Error updating crop yield:", error);
        });
    }
  };

  const csvData = sensorData.map((entry) => ({
    temperature: entry.temperature,
    humidity: entry.humidity,
    soilmoisture: entry.soilmoisture,
    sunlight: entry.sunlight,
    rain: entry.rain,
    time: entry.time,
    date: entry.date,
  }));

  const pieData = [
    { name: "Temperature", value: sensorData.reduce((acc, entry) => acc + entry.temperature, 0) / sensorData.length },
    { name: "Humidity", value: sensorData.reduce((acc, entry) => acc + entry.humidity, 0) / sensorData.length },
    { name: "Soil Moisture", value: sensorData.reduce((acc, entry) => acc + entry.soilmoisture, 0) / sensorData.length },
    { name: "Sunlight", value: sensorData.reduce((acc, entry) => acc + entry.sunlight, 0) / sensorData.length },
    { name: "Rain", value: sensorData.reduce((acc, entry) => acc + entry.rain, 0) / sensorData.length },
  ];

  const cropYieldCsvData = Object.keys(cropYields).flatMap(season => 
    Object.keys(cropYields[season]).map(crop => ({
      season,
      crop,
      estimatedYield: cropYields[season][crop]
    }))
  );

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

  return (
    <main className='main-container'>
      <div className='main-title'>
      <div className='csv-download'>
        <CSVLink data={csvData} filename={"sensor_data.csv"} className="btn btn-primary">
          Download Sensor Data CSV
        </CSVLink>
      </div>
      </div>

      <div className='table-container'>
        <h3>Sensor Data Table</h3>
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Soil Moisture_100%</th>
              <th>Sunlight_100%</th>
              <th>Rain_100%</th>
              <th>Time of Day</th>
               <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((entry) => (
              <tr key={entry.timestamp}>
                <td>{entry.temperature}</td>
                <td>{entry.humidity}</td>
                <td>{entry.soilmoisture}</td>
                <td>{entry.sunlight}</td>
                <td>{entry.rain}</td>
                <td>{entry.time}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        
        </table>
      </div>
      <div className='csv-download'>
        <CSVLink data={csvData} filename={"sensor_data.csv"} className="btn btn-primary">
          Download Sensor Data CSV
        </CSVLink>
      </div>
    </main>
  );
}

export default Historical;

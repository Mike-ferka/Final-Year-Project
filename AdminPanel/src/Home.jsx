import React from 'react';
import './Home.css';
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill
} from 'react-icons/bs';
import { CiTempHigh } from "react-icons/ci";
import { WiDayRainMix, WiHumidity, WiHail, WiDaySunny, WiCelsius } from "react-icons/wi";
import { BsMoisture } from "react-icons/bs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { useEffect, useState } from "react";
import { ref, get, query, orderByKey, limitToLast } from "firebase/database";
import { database } from "./firebase"; // Adjust the path as per your directory structure
import { CSVLink } from "react-csv";

function Home() {
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
        }
      }).catch((error) => {
        console.error("Error fetching user devices:", error);
      });

      const sensorReadingsRef = query(
        ref(database, `users/${userId}/sensorReadings`),
        orderByKey(),
        limitToLast(300)
      );

      get(sensorReadingsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const readings = Object.keys(snapshot.val()).map(key => ({
            ...snapshot.val()[key],
            timestamp: key
          }));
          setSensorData(readings);
        }
      }).catch((error) => {
        console.error("Error fetching sensor readings:", error);
      });
    }
  }, [userId]);

  // Get the latest sensor data
  const latestSensorData = sensorData.length ? sensorData[sensorData.length - 1] : {};

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>TEMPERATURE </h3>
          </div>
          <h1>{latestSensorData.temperature ?? 'fetching..'} <WiCelsius /></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>HUMIDITY</h3>
          </div>
          <h1>{latestSensorData.humidity ?? 'fetching..'}  <WiHumidity/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SOIL MOISTURE</h3>
          </div>
          <h1>{latestSensorData.soilmoisture ?? 'fetching..'} <BsMoisture/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SUNLIGHT</h3>
          </div>
          <h1>{latestSensorData.sunlight ?? 'fetching..'} <WiDaySunny/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>RAIN</h3>
          </div>
          <h1>{latestSensorData.rain ?? 'fetching..'} <WiDayRainMix/></h1>
        </div>
      </div>

      <div className='charts-container'>
        <div className='chart-wrapper'>
          <div className='chart-content'>
            <div className='chart'>
              <h3>Sensor Data Line Chart</h3>
              <ResponsiveContainer>
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="soilmoisture" stroke="#ffc658" />
                  <Line type="monotone" dataKey="sunlight" stroke="#ff7300" />
                  <Line type="monotone" dataKey="rain" stroke="#387908" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className='chart-wrapper'>
          <div className='chart-content'>
            <div className='chart'>
              <h3>Sensor Data Bar Chart</h3>
              <ResponsiveContainer>
                <BarChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="temperature" fill="#8884d8" />
                  <Bar dataKey="humidity" fill="#82ca9d" />
                  <Bar dataKey="soilmoisture" fill="#ffc658" />
                  <Bar dataKey="sunlight" fill="#ff7300" />
                  <Bar dataKey="rain" fill="#387908" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

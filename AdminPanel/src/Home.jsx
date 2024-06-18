import React from 'react'
import './Home.css'
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill
} from 'react-icons/bs';
import { CiTempHigh } from "react-icons/ci";
import { WiDayRainMix, WiHumidity, WiHail,WiDaySunny,WiCelsius } from "react-icons/wi";
import { BsMoisture } from "react-icons/bs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
 import { useEffect, useState } from "react";
import { ref, get, child,set } from "firebase/database";
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
  }));

  const cropYieldCsvData = Object.keys(cropYields).flatMap(season => 
    Object.keys(cropYields[season]).map(crop => ({
      season,
      crop,
      estimatedYield: cropYields[season][crop]
    }))
  );

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
          <h1>{sensorData.length ? sensorData[sensorData.length - 1].temperature : 'N/A'} <WiCelsius /></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>HUMIDITY</h3>
          </div>
          <h1>{sensorData.length ? sensorData[sensorData.length - 1].humidity : 'N/A'}  <WiHumidity/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SOIL MOISTURE</h3>
          </div>
          <h1>{sensorData.length ? sensorData[sensorData.length - 1].soilmoisture : 'N/A'} <BsMoisture/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SUNLIGHT</h3>
          </div>
          <h1>{sensorData.length ? sensorData[sensorData.length - 1].sunlight : 'N/A'} <WiDaySunny /></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>RAIN</h3>
          </div>
          <h1>{sensorData.length ? sensorData[sensorData.length - 1].rain : 'N/A'} <WiHail/></h1>
        </div>
        
      </div>
      

      <div className='charts-container'>
        <div className='chart'>
          <h3>Sensor Data Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature" fill="#8884d8" />
              <Bar dataKey="humidity" fill="#82ca9d" />
              <Bar dataKey="soilmoisture" fill="#ffc658" />
              <Bar dataKey="sunlight" fill="#ff8042" />
              <Bar dataKey="rain" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='chart'>
          <br/>
          <h3>Temperature Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='chart'>
          <br/>
          <br/>
          <h3>Humidity Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

     
    </main>
  );
}

export default Home;
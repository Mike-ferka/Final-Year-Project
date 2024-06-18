import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { WiDayRainMix, WiHumidity, WiHail,WiDaySunny,WiCelsius } from "react-icons/wi";
import { BsMoisture } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";

 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { useEffect, useState } from "react";
 import { ref, get, child } from "firebase/database";
 import { database } from "../firebase"; // Adjust the path as per your directory structure

 function Sensors() {
  const [deviceLocation, setDeviceLocation] = useState({});
  const [deviceStatus, setDeviceStatus] = useState({});
  const [userId, setUserId] = useState(null);

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("No userId found in localStorage");
    }
  }, []);

  // Fetch user data when userId is available
useEffect(() => {
  if (userId) {
    console.log("Fetching data for userId:", userId);
    const userRef = ref(database, `users/${userId}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userDevices = snapshot.val();
        console.log("User devices:", userDevices);

        // Fetch device location
        if (userDevices.DeviceLocation) {
          setDeviceLocation(userDevices.DeviceLocation);
          console.log("Device locations set:", userDevices.DeviceLocation);
        } else {
          console.log("No device location available");
        }

        // Fetch device status
        if (userDevices.SensorStatus) {
          setDeviceStatus(userDevices.SensorStatus);
          console.log("Device statuses set:", userDevices.SensorStatus);
        } else {
          console.log("No device status available");
        }
      } else {
        console.log("No devices found for user");
      }
    }).catch((error) => {
      console.error("Error fetching user devices:", error);
    });
  }
}, [userId]);


  // Check if deviceLocation and deviceStatus have been set correctly
  console.log("Device Location State:", deviceLocation);
  console.log("Device Status State:", deviceStatus);
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Sensors Overview</h3>
      </div>
  
      <div className='main-cards'>
        <div className='home_card'>
          <div className='card-inner'>
            <h3>Humidity Sensor</h3>
            <WiHumidity className='card_icon' />
          </div>
          <h5><CiLocationOn className='sensor_icon'/> {deviceLocation.humidity || 'N/A'}</h5>
          <h6 className={deviceStatus.tempSensor=='on'?'blink':''}><MdSignalWifiStatusbar1Bar className='sensor_icon'/> {deviceStatus.tempSensor || 'N/A'}</h6>
        </div>
        
        <div className='home_card'>
          <div className='card-inner'>
            <h3>Soil Moisture Sensor</h3>
            <BsMoisture className='card_icon' />
          </div>
          <h5><CiLocationOn className='sensor_icon'/>{deviceLocation.soilMoisture || 'N/A'}</h5>
          <h6 className={deviceStatus.soilSensor=='on'?'blink':''}><MdSignalWifiStatusbar1Bar className='sensor_icon'/> {deviceStatus.soilSensor || 'N/A'}</h6>
        </div>
  
        <div className='home_card'>
          <div className='card-inner'>
            <h3>Rain Sensor</h3>
            <WiHail className='card_icon' />
          </div>
          <h5><CiLocationOn className='sensor_icon'/>{deviceLocation.rain || 'N/A'}</h5>
          <h6 className={deviceStatus.rainSensor=='on'?'blink':''}><MdSignalWifiStatusbar1Bar className='sensor_icon'/> {deviceStatus.rainSensor || 'N/A'}</h6>
        </div>
  
        <div className='home_card'>
          <div className='card-inner'>
            <h3>Temperature Sensor</h3>
            <WiCelsius  className='card_icon' />
          </div>
          <h5><CiLocationOn className='sensor_icon'/>{deviceLocation.temperature || 'N/A'}</h5>
          <h6 className={deviceStatus.tempSensor=='on'?'blink':''}><MdSignalWifiStatusbar1Bar className='sensor_icon'/> {deviceStatus.tempSensor || 'N/A'}</h6>
        </div>
  
        <div className='home_card'>
          <div className='card-inner'>
            <h3>Sunlight Sensor</h3>
            <WiDaySunny className='card_icon' />
          </div>
          <h5><CiLocationOn className='sensor_icon'/>{deviceLocation.sunlight || 'N/A'}</h5>
          <h6 className={deviceStatus.sunSensor=='on'?'blink':''}><MdSignalWifiStatusbar1Bar className='sensor_icon'/> {deviceStatus.sunSensor || 'N/A'}</h6>
        </div>
      </div>
    </main>
  );
  
}

export default Sensors;
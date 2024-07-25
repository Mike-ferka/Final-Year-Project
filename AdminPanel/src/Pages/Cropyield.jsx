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
import { ref, get, child, set } from "firebase/database";
import { database } from "../firebase"; // Adjust the path as per your directory structure
import { CSVLink } from "react-csv";

function Cropyield() {
  const [sensorData, setSensorData] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState({});
  const [deviceStatus, setDeviceStatus] = useState({});
  const [userId, setUserId] = useState(null);
  const [cropYields, setCropYields] = useState({});
  const [cropType, setCropType] = useState("");
  const [estimatedYield, setEstimatedYield] = useState("");
  const [season, setSeason] = useState("");
  const [cropYear, setCropYear] = useState("");
  const [fertilizerOrPesticide, setFertilizerOrPesticide] = useState("");

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

  const handleCropYearChange = (e) => {
    setCropYear(e.target.value);
  };

  const handleFertilizerOrPesticideChange = (e) => {
    setFertilizerOrPesticide(e.target.value);
  };

  const handleSaveCropYield = () => {
    if (userId && cropType && season && cropYear && fertilizerOrPesticide) {
      const path = `users/${userId}/cropYields/${season}/${cropType}`;
      const cropData = {
        estimatedYield,
        cropYear,
        fertilizerOrPesticide
      };
      set(ref(database, path), cropData)
        .then(() => {
          setCropYields({ ...cropYields, [season]: { ...cropYields[season], [cropType]: cropData } });
          setCropType("");
          setEstimatedYield("");
          setSeason("");
          setCropYear("");
          setFertilizerOrPesticide("");
        })
        .catch((error) => {
          console.error("Error updating crop yield:", error);
        });
    }
  };

  const cropYieldCsvData = Object.keys(cropYields).flatMap(season => 
    Object.keys(cropYields[season]).map(crop => ({
      season,
      crop,
      estimatedYield: cropYields[season][crop].estimatedYield,
      cropYear: cropYields[season][crop].cropYear,
      fertilizerOrPesticide: cropYields[season][crop].fertilizerOrPesticide
    }))
  );

  return (
    <main className='main-container'>
      <div className='table-container'>
        <div className='crop-yield'>
          <h4>Estimated Crop Yield</h4>
          <input
            type="text"
            value={cropType}
            onChange={handleCropTypeChange}
            placeholder="Crop Type"
          />
          <input
            type="text"
            value={estimatedYield}
            onChange={handleEstimatedYieldChange}
            placeholder="Estimated Yield"
          />
          <input
            type="text"
            value={season}
            onChange={handleSeasonChange}
            placeholder="Season"
          />
          <input
            type="text"
            value={cropYear}
            onChange={handleCropYearChange}
            placeholder="Crop Year"
          />
          <input
            type="text"
            value={fertilizerOrPesticide}
            onChange={handleFertilizerOrPesticideChange}
            placeholder="Fertilizer or Pesticide Used"
          />
          <button onClick={handleSaveCropYield}>Save</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Season</th>
              <th>Crop Type</th>
              <th>Estimated Yield</th>
              <th>Crop Year</th>
              <th>Fertilizer or Pesticide Used</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cropYields).map(season => 
              Object.keys(cropYields[season]).map(crop => (
                <tr key={`${season}-${crop}`}>
                  <td>{season}</td>
                  <td>{crop}</td>
                  <td>{cropYields[season][crop].estimatedYield}</td>
                  <td>{cropYields[season][crop].cropYear}</td>
                  <td>{cropYields[season][crop].fertilizerOrPesticide}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='csv-download'>
        <CSVLink data={cropYieldCsvData} filename={"crop_yield_data.csv"} className="btn btn-primary" style={{ marginLeft: "20px" }}>
          Download Crop Yield Data CSV
        </CSVLink>
      </div>
    </main>
  );
}

export default Cropyield;

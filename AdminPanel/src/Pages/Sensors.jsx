import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { CiTempHigh } from "react-icons/ci";
 import { WiDayRainMix } from "react-icons/wi";
 import { WiBarometer } from "react-icons/wi";
 import { WiHail } from "react-icons/wi";
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Sensors() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Sensors Overview</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Temperature Sensor</h3>
                    <CiTempHigh  className='card_icon'/>
                </div>
                    <h5>Location :</h5>
                    <h6>Status : ON</h6>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Humidity Sensor</h3>
                    <WiDayRainMix className='card_icon'/>
                </div>
                <h5>Location :</h5>
                <h6>Status : ON</h6>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Soil Moisture Sensor</h3>
                    <WiHail className='card_icon'/>
                </div>
                <h5>Location :</h5>
                <h6>Status : ON</h6>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Air Pressure Sensor</h3>
                    <WiBarometer className='card_icon'/>
                </div>
                <h5>Location :</h5>
                <h6>Status : ON</h6>
            </div>
        </div>

        <div className='charts'>
            

        </div>
    </main>
  )
}

export default Sensors
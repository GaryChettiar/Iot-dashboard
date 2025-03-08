import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { database, ref, onValue, push } from "./firebase"; // Firebase imports

export default function IotDashboard() {
  // State for the latest sensor data
  const [sensorData, setSensorData] = useState({
    Humidity: 0,
    SoilMoisture: 0,
    Temperature: 0,
    pH: 0,
    Timestamp: "",
  });

  // State for chart data (stores all previous readings)
  const [chartData, setChartData] = useState({
    Temperature: [],
    Humidity: [],
    SoilMoisture: [],
    pH: [],
  });

  // State for storing ALL sensor readings history
  const [liveDataList, setLiveDataList] = useState([]);

  useEffect(() => {
    // Reference to "PlantSystem" node in Firebase
    const dbRef = ref(database, "PlantSystem");

    // Listen for real-time updates
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Ensure the data has a timestamp
        const timestamp = data.Timestamp || new Date().toISOString();

        setSensorData(data);

        // Append new data to charts
        setChartData((prevChartData) => ({
          Temperature: [...prevChartData.Temperature, { time: timestamp, value: data.Temperature }],
          Humidity: [...prevChartData.Humidity, { time: timestamp, value: data.Humidity }],
          SoilMoisture: [...prevChartData.SoilMoisture, { time: timestamp, value: data.SoilMoisture }],
          pH: [...prevChartData.pH, { time: timestamp, value: data.pH }],
        }));

        // Append new data to the sidebar history
        setLiveDataList((prevList) => [
          { time: timestamp, ...data }, // Add new reading at the top
          ...prevList,
        ]);
      }
    });
  }, []);

  // Metrics Data (Updated from Firebase)
  const metrics = [
    { name: "Temperature", value: `${sensorData.Temperature}°C` },
    { name: "Humidity", value: `${sensorData.Humidity}%` },
    { name: "Soil Moisture", value: `${sensorData.SoilMoisture}` },
    { name: "pH Level", value: `${sensorData.pH}` },
  ];

  // Chart Component (Reusable for all parameters)
  const Chart = ({ title, dataKey, color }) => (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData[dataKey]}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      {/* IoT Live Sidebar */}
      <div className="iot-sidebar">
        <h3 className="iot-title">IoT Live Data ⬇️</h3>
        <div className="iot-card">
          <ul className="live-data-list">
            {liveDataList.map((entry, index) => (
              <li key={index} className="live-data-item">
                <p><strong>{entry.time}</strong></p>
                <p>🌡️ Temp: {entry.Temperature}°C</p>
                <p>💧 Humidity: {entry.Humidity}%</p>
                <p>🌱 Soil Moisture: {entry.SoilMoisture}</p>
                <p>⚗️ pH: {entry.pH}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-title">IoT Monitoring Dashboard</h1>
        <button className="connect-button">Use drone
        </button>
        <button className="connect-button">Flood prediction
        </button>
        <button className="connect-button">Tea leaves </button>
        <button className="connect-button">Vegetable disease detection</button>
      </div>

        <h2 className="metrics-title">Key Metrics</h2>
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3 className="metric-name">{metric.name}</h3>
              <p className="metric-value">{metric.value}</p>
            </div>
          ))}
        </div>

        <h2 className="metrics-title">Live Sensor Data</h2>
        <div className="chart-grid">
          <Chart title="Temperature Over Time" dataKey="Temperature" color="#ff4d4d" />
          <Chart title="Humidity Over Time" dataKey="Humidity" color="#4da6ff" />
          <Chart title="Soil Moisture Over Time" dataKey="SoilMoisture" color="#4ade80" />
          <Chart title="pH Level Over Time" dataKey="pH" color="#ffcc00" />
        </div>
      </div>
    </div>
  );
}

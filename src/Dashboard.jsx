import React from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const metrics = [
  { name: 'Temperature', value: '22°C', change: '+3%' },
  { name: 'Humidity', value: '45%', change: '-2%' },
  { name: 'Soil Moisture', value: '30%', change: '+5%' },
  { name: 'pH Level', value: '6.5', change: '0%' },
];

const data = [
    { time: "00:00", value: 22 },
    { time: "01:00", value: 23 },
    { time: "02:00", value: 21 },
    { time: "03:00", value: 22.5 },
  ];

const liveData = [
  { time: '12:01:15', sensor: 'Temperature', reading: '22°C', status: 'Stable', connection: 'Connected' },
  { time: '12:02:30', sensor: 'Humidity', reading: '45%', status: 'High', connection: 'Connected' },
  { time: '12:03:40', sensor: 'Soil Moisture', reading: '30%', status: 'Low', connection: 'Connected' },
];

const users = ['src/assets/p1.png', 'src/assets/p1.png', 'src/assets/p1.png'];
const Chart = ({ title }) => (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
export default function IotDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* IoT Live Sidebar */}
      <div className="iot-sidebar">
        <h3 className="iot-title">IOT LIVE Data ⬇️</h3>
        {liveData.map((data, index) => (
          <div key={index} className="iot-card">
            <p><strong>Timestamp:</strong> {data.time}</p>
            <p><strong>Sensor:</strong> {data.sensor}</p>
            <p><strong>Reading:</strong> {data.reading}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Connection:</strong> {data.connection}</p>
          </div>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-container">
         <div className="header">
        <h1 className="dashboard-title">IoT Monitoring Dashboard</h1>
        <button className="connect-button">Connect</button>
      </div>
        <div className="dashboard-header">
          <h1 className="dashboard-title">IoT Monitoring Dashboard</h1>
          <div className="dashboard-status">
            <span className="badge operational">● Operational</span>
            <button className="share-button">Share</button>
          </div>
        </div>

        <div className="user-list">
          {users.map((src, index) => (
            <img key={index} src={src} alt={`User ${index}`} className="avatar" />
          ))}
          <span className="user-names">Gunmay, Nishant, Charlie +12 others</span>
        </div>

        <div className="tabs">
          <span className="tab active">Dashboard</span>
          <span className="tab">Logs</span>
          <span className="tab">Settings</span>
        </div>

        <h2 className="metrics-title">Key Metrics</h2>
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3 className="metric-name">{metric.name}</h3>
              <p className="metric-value">{metric.value}</p>
              <p className={`metric-change ${metric.change.includes('-') ? 'negative' : 'positive'}`}>{metric.change}</p>
            </div>
          ))}
        </div>
        <div className="chart-grid">
        <Chart title="Temperature Over Time" />
        <Chart title="Soil Moisture Over Time" />
        <Chart title="Humidity Over Time" />
      </div>
      </div>
    </div>
  );
}

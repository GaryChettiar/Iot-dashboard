import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Dashboard from './Dashboard'
import IotDashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <IotDashboard/>
  )
}

export default App

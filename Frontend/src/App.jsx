import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [employee, setEmployee] = useState([])

  useEffect(() =>{
    fetch('http://localhost:8081/all')
      .then(res => res.json())
      .then(data => {
        let employeeData = data.map(emp => {
        return (
          <div key={emp.id}>
            <h2>{emp.first_name} {emp.last_name}</h2>
            <p>{emp.email}</p>
            <p>{emp.address}</p>
            <p>{emp.phone_number}</p>
            <p>Employee Id: {emp.employee_id}</p>
          </div>
        )

      })
      setEmployee(employeeData)
      },[])
  })
  return (
    <>
    <h1>Who works here?</h1>
      <div>{employee}</div>
   </>
  )
}

export default App

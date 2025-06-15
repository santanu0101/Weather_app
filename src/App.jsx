import React from 'react'
import Weather from './components/weather'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
     <>
      <Weather />
      <ToastContainer />
    </>
  )
}

export default App
import React from 'react'

import { ToastContainer } from 'react-toastify';
import Weather from './components/Weather';

function App() {
  return (
     <>
      <Weather />
      <ToastContainer />
    </>
  )
}

export default App
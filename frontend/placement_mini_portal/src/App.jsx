import { useState } from 'react'
// import Register from './components/Register.jsx'
import Hero from './components/Landing_page/Hero';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Register/> */}
        <Hero/>
      </div>
    </>
  )
}

export default App

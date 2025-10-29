import { useState } from 'react'
import Register from './Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Register/>
      </div>
    </>
  )
}

export default App

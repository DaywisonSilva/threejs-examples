import { useState } from 'react'
import './App.css'
import { Cube } from './pages'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div className='bg-gray-900 h-full'>
      <h1 className='text-xl text-center text-white'>
        Welcome To Three.js + Tailwind CSS Application
      </h1>
      <Cube />
    </div>
  )
}

export default App

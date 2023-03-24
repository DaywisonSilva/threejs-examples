import { useState } from 'react'
import './App.css'
import { Cube } from './pages'
import Aircraft from './pages/Aircraft'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div className='bg-gray-900 h-full'>
      <Aircraft />
    </div>
  )
}

export default App

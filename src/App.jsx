
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar/Navbar'

function App() {


  return (
    <div className='bg-[#c03434]'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App

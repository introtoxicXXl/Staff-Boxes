
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar/Navbar'
import Footer from './Shared/Footer/Footer'

function App() {


  return (
    <div className=''>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App

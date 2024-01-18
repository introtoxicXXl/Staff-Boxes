import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar/Navbar'
import Footer from './Shared/Footer/Footer'
import Loader from './Components/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='relative'>
      {
        loading ? <Loader /> : <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      }
    </div>
  )
}

export default App

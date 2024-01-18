import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import Dropdown from './Dropdown/Dropdown';
import useAuth from '../../Hooks/useAuth';
import NavProfile from './NavProfile';

const Navbar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const from = location.pathname
    console.log(from)
    const button = from === '/login' ? <Link to='/register'>
        <button type="button" className="btn md:btn-md md:block hidden btn-outline hover:text-white btn-accent">Register</button>
    </Link> : <Link to='/login'>
        <button type="button" className="btn md:btn-md md:block hidden btn-outline hover:text-white btn-accent">Login</button>
    </Link>

    return (
        <nav className="bg-[#fff] fixed w-full z-50 top-0 start-0 shadow border-gray-200 dark:border-gray-600">
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4 container">
                <Link to='/' className="" >
                    <img className='w-14 ml-4' src={logo} alt="" />
                    <p className='rotate-[2deg] text-lg font-knewave'><span className='text-[#16A7FC]'>Stuff</span> Boxes</p>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
                    {
                        user ?
                            <NavProfile />
                            :
                            button
                    }

                    <Dropdown />
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex menu flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <NavLink to='/' className="block py-2 text-center px-3 text-black rounded">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/about' className="block text-center py-2 px-3 text-black rounded">About</NavLink>
                        </li>
                        {
                            user ? <li>
                                <Link to='/Dashboard' className='block text-center py-2 px-3 text-black rounded'>Dashboard</Link>
                            </li> : <li>
                                <NavLink to='/pricing' className='block text-center py-2 px-3 text-black rounded'>Pricing</NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
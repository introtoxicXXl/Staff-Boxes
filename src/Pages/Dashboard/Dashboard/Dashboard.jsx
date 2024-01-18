import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { TfiMenuAlt } from "react-icons/tfi";
import { Helmet } from "react-helmet";

const Dashboard = () => {

    return (
        <div className="flex">
            <Helmet><title>Dashboard</title></Helmet>
            <div className="md:w-2/12 bg-[#16A7FC] min-h-screen">
                <div className="flex justify-center">
                    <ul className="menu fixed space-y-3">
                        <li className="">
                            <Link to='/' className="" >
                                <p className='text-white text-lg font-knewave'><span className='text-[#0e212c]'>Stuff</span> Boxes</p>
                            </Link>
                        </li>
                        <li className="">
                            <NavLink to='/dashboard/myProfile' className='flex items-center'> <FaHome className="mr-2" /> My Profile</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/dashboard/bookParcel' className='flex items-center'><ImSpoonKnife className="mr-2" />Book Parcel</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/dashboard/myParcel' className='flex items-center'><TfiMenuAlt className="mr-2" />My Parcel</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="md:w-10/12">
                <Outlet />
            </div>
        </div >
    );
};

export default Dashboard;
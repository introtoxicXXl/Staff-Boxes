import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { TfiMenuAlt } from "react-icons/tfi";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
    const [open, setOpen] = useState(false);

    const dashboardNav = <>
        <li className="">
            <Link to='/' className="" >
                <p className='text-white lg:text-lg md:text-md text-md font-knewave'><span className='text-[#0e212c]'>Stuff</span> Boxes</p>
            </Link>
        </li>
        <li className="">
            <NavLink to='/dashboard/myProfile' className='flex items-center lg:text-base text-sm'> <FaHome className="mr-1" /> My Profile</NavLink>
        </li>
        <li className="">
            <NavLink to='/dashboard/bookParcel' className='flex items-center text-sm lg:text-base'><ImSpoonKnife className="mr-2" />Book Parcel</NavLink>
        </li>
        <li className="">
            <NavLink to='/dashboard/myParcel' className='flex items-center text-sm lg:text-base'><TfiMenuAlt className="mr-2" />My Parcel</NavLink>
        </li>
        <li className="">
            <NavLink to='/dashboard/allUser' className='flex items-center text-sm lg:text-base'><TfiMenuAlt className="mr-2" />All Users</NavLink>
        </li>
    </>

    return (
        <div className="px-4 py-5 lg:px-0 lg:py-0">
            <Helmet><title>Dashboard</title></Helmet>
            <div className="">
                <div className="drawer lg:hidden block drawer-end">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <motion.label variants={iconVariants} htmlFor="my-drawer" onClick={()=>setOpen(true)} className="btn btn-outline btn-accent drawer-button"> 
                        {open ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                :
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>}
                        </motion.label>
                    </div>
                    <div className="drawer-side z-30">
                        <label htmlFor="my-drawer" onClick={()=>setOpen(false)} aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 md:w-1/2 w-2/3 min-h-full bg-[#16A7FC] text-base-content">
                            {dashboardNav}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lg:flex">
                <div className="lg:w-2/12 bg-[#16A7FC] min-h-screen lg:block hidden">
                    <div className="flex justify-center">
                        <ul className="menu fixed space-y-3">
                            {dashboardNav}
                        </ul>
                    </div>
                </div>
                <div className="lg:w-10/12 overflow-x-auto min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div >
    );
};

export default Dashboard;

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

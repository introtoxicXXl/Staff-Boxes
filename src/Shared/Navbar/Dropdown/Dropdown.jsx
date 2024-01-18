import { FiHome } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { ImPriceTags } from "react-icons/im";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import useAuth from '../../../Hooks/useAuth';

const Dropdown = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleSignOut = () => {
        logout()
            .then(() => { })
    }

    return (
        <div className="md:hidden block">
            <div className="flex items-center justify-center">
                <motion.div animate={open ? "open" : "closed"} className="relative">
                    <button
                        onClick={() => setOpen((pv) => !pv)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-gray-500 transition-colors"
                    >
                        <motion.span variants={iconVariants}>
                            {open ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                :
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>}
                        </motion.span>
                    </button>

                    <motion.ul
                        initial={wrapperVariants.closed}
                        variants={wrapperVariants}
                        style={{ originY: "top", translateX: "-70%" }}
                        className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%]  overflow-hidden left-0 w-80 z-50"
                    >
                        {
                            user && <motion.li
                                variants={itemVariants}
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md text-slate-900  transition-colors cursor-pointer"
                            >
                                <div className="avatar placeholder">
                                    <motion.div variants={actionIconVariants}
                                        className="bg-neutral text-neutral-content rounded-full w-5"
                                    >
                                        {
                                            user?.photoURL ? <img src={user?.photoURL} alt="" /> : <span className="text-xs">UI</span>
                                        }
                                    </motion.div>
                                </div>
                                <span>{user?.displayName}</span>
                            </motion.li>    
                        }
                        <Link to='/'><Option setOpen={setOpen} Icon={FiHome} text="Home" /></Link>
                        <Link to='/about'><Option setOpen={setOpen} Icon={FcAbout} text="About Us" /></Link>
                        
                        {
                            user ? <Link to='/dashboard'><Option setOpen={setOpen} Icon={MdOutlineDashboardCustomize } text="Dashboard" /></Link> : <Link to='/pricing'><Option setOpen={setOpen} Icon={ImPriceTags } text="Pricing" /></Link> 
                        }
                        {
                            !user && <Link to='/login'><Option setOpen={setOpen} Icon={VscSignIn} text="Login" /></Link>
                        }
                        {
                            user && <a onClick={handleSignOut}><Option setOpen={setOpen} Icon={VscSignOut} text="Sign Out" /></a>
                        }
                    </motion.ul>
                </motion.div>
            </div>
        </div>
    );
};

const Option = ({ text, Icon, setOpen }) => {

    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md text-slate-900  transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};
Option.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.element.isRequired,
    setOpen: PropTypes.func.isRequired,
};


export default Dropdown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};
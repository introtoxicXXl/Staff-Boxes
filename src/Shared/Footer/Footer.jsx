import moment from "moment";
import { Link } from "react-router-dom";
const Footer = () => {

    return (


        <footer className="bg-[#333333]">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link to='/'><p className='text-3xl text-center text-gray-400 font-knewave'><span className='text-[#16A7FC]'>Stuff</span> Boxes</p></Link>
                        <p className="text-gray-400 text-center mt-2 text-sm">Best Courier  box  delivery Company <br /> in bangladesh  </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Others Links</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Blogs</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Movers website</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Traffic Update</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Services</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Corporate goods</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Artworks</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Documents</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Customer Care</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">About Us</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Contact US</a>
                                </li>
                                <li className="mb-2">
                                    <a className="hover:underline cursor-pointer">Get Update</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="text-center">
                    <span className="text-sm sm:text-center text-gray-400">© 2020-{moment().format('YYYY')} <span className='rotate-[3deg] text-lg font-knewave'><span className='text-[#16A7FC]'>Stuff</span> Boxes</span> All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
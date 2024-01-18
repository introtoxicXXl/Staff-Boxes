import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { PropTypes } from 'prop-types';


const Modal = ({ isOpen, setIsOpen, data }) => {
    const { firstName, lastName, email, phoneNumber, parcelType, receiverName, receiverPhone, deliveryAddress, requestDate, deliveryAddressLatitude, deliveryAddressLongitude, weight, price, trackingID, status
    } = data;
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "12.5deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-[#16A7FC] to-indigo-500 text-white p-6 rounded-lg md:w-3/5 shadow-xl cursor-default relative overflow-hidden"
                    >
                        <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                        <div className="relative z-10">
                            <div className="  mb-2  text-3xl text-indigo-600 grid place-items-center mx-auto">
                                <p className='text-white md:text-3xl mb-4 text-xl font-knewave'><span className='text-[#0e212c]'>Stuff</span> Boxes</p>
                            </div>
                            <div>
                                <div className="flex justify-around md:flex-row flex-col mb-6">
                                    <div className="text-sm">
                                        <h2 className="text-lg font-bold text-neutral font-oxanium">From</h2>
                                        <p>Name: {`${firstName} ${lastName}`}</p>
                                        <p>Email: {email}</p>
                                        <p>Phone Number: {phoneNumber}</p>
                                        <p>Parcel Type: {parcelType}</p>
                                    </div>
                                    <div className="divider md:divider-horizontal"></div>
                                    <div className="text-sm">
                                        <h2 className="text-lg font-bold text-neutral font-oxanium">To</h2>
                                        <p>Receiver Name: {receiverName}</p>
                                        <p>Receiver Phone: {receiverPhone}</p>
                                        <p>Address: {deliveryAddress}</p>
                                        <p>Address Latitude: {deliveryAddressLatitude}</p>
                                        <p>Address Longitude: {deliveryAddressLongitude}</p>
                                        <p>Request Date: {requestDate}</p>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div>
                                    <div className="lg:w-1/2 lg:ml-auto">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>TrackingID</td>
                                                    <td className="text-right">{trackingID}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td className="text-right">{status}</td>
                                                </tr>
                                                <tr>
                                                    <td>Weight</td>
                                                    <td className="text-right">{weight} Kg</td>
                                                </tr>
                                                <tr>
                                                    <td>Price</td>
                                                    <td className="text-right">{price} Taka</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-5">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                >
                                    Understood!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
Modal.propTypes = {
    isOpen: PropTypes.boolean,
    setIsOpen: PropTypes.func,
    data: PropTypes.object
}
export default Modal;
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import Modal from "../../../Components/Modal/Modal";
import moment from "moment";
import { Helmet } from "react-helmet";

const BookParcel = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: dbUser = [] } = useQuery({
    queryKey: ['user', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data
    }
  })
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  const generateTrackingID = () => {
    const randomString = generateRandomString(8);
    const trackingID = `#${randomString}`;
    return trackingID;
  };
  const calculatePrice = (weight) => {
    if (weight <= 1) {
      return 50;
    } else if (weight <= 2) {
      return 100;
    } else if (weight <= 10) {
      return 150;
    } else if (weight <= 30) {
      return 1500;
    } else if (weight <= 100) {
      return 3500;
    } else {
      return 6500;
    }
  };

  const onSubmit = async (parcel) => {
    setLoading(true);
    const weight = parseFloat(parcel.parcelWeight);
    const price = calculatePrice(weight);
    const trackingID = generateTrackingID()
    const status = "Pending";
    const bookingDate = moment().format('L');
    const requestedDate = moment(parcel.requestDate);
    const approximateDate = requestedDate.clone().add(3, 'days').format('L');

    const bookingsInfo = {
      ...parcel,
      price,
      trackingID,
      status,
      bookingDate,
      approximateDate,
      paymentStatus:'Pending'
    }
    setFormData(bookingsInfo);

    const res = await axiosSecure.post('/bookParcel', bookingsInfo)
    if (res.data.insertedId) {
      setIsOpen(true)
      setLoading(false)
    }

  }
  return (
    <div className="md:w-11/12 mx-auto my-10 relative">
    <Helmet><title>Book Parcel</title></Helmet>
      <h1 className="text-center text-2xl font-bold font-raleway">Hello, Book your valuable parcel</h1>
      <div>
        <form className="w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
          {/* first name and last name  */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={user?.displayName.split(' ')[0]}
                {...register('firstName', { required: true })}
                type="text"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.firstName?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write your first name*</p>
              )}
              <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={user?.displayName.split(' ')[1]}
                {...register('lastName', { required: true })}
                type="text"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.lastName?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write your last name*</p>
              )}
              <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
          </div>
          {/* email and phone number  */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={user?.email}
                {...register('email', { required: true })}
                type="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write your email*</p>
              )}
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                defaultValue={dbUser?.phoneNumber}
                {...register('phoneNumber', { required: true })}
                type="tel"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.phoneNumber?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write your phone number*</p>
              )}
              <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
            </div>
          </div>
          {/* parcel type and parcel weight  */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('parcelType', { required: true })}
                type="text"
                id="floating_parcelType"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.parcelType?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write which type of your parcel*</p>
              )}
              <label htmlFor="floating_parcelType" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Parcel Type</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('parcelWeight', { required: true })}
                step="0.0000001"
                type="number"
                id="floating_parcelWeight"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.parcelWeight?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write parcel weight (Kg)*</p>
              )}
              <label htmlFor="floating_parcelWeight" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Parcel Weight (Kg)</label>
            </div>
          </div>
          {/* Receiver name and phone number  */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('receiverName', { required: true })}
                type="text"
                id="floating_receiverName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.receiverName?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write receiver name*</p>
              )}
              <label htmlFor="floating_receiverName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Receiver Name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('receiverPhone', { required: true })}
                type="tel"
                id="floating_receiverPhone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.receiverPhone?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write receiver phone number*</p>
              )}
              <label htmlFor="floating_receiverPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Receiver Phone Number</label>
            </div>
          </div>
          {/* delivery address*/}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('deliveryAddress', { required: true })}
                type="address"
                id="floating_receiverPhone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.deliveryAddress?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write delivery address*</p>
              )}
              <label htmlFor="floating_receiverPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Delivery Address</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('requestDate', { required: true })}
                type="date"
                id="floating_requestDate"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.requestDate?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Select request date*</p>
              )}
              <label htmlFor="floating_receiverPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Request Date</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('deliveryAddressLatitude', { required: true })}
                type="number"
                step="0.000000001"
                id="floating_deliveryAddressLatitude"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.deliveryAddressLatitude?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write delivery address latitude*</p>
              )}
              <label htmlFor="floating_receiverPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Delivery Address Latitude</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register('deliveryAddressLongitude', { required: true })}
                step="0.00000001"
                type="number"
                id="floating_deliveryAddressLongitude"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.deliveryAddressLongitude?.type === "required" && (
                <p role="alert" className="text-sm text-red-600 mt-1">Write delivery address longitude*</p>
              )}
              <label htmlFor="floating_receiverPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Delivery Address Longitude</label>
            </div>
          </div>
          <button
            type="submit"
            className="btn text-lg btn-outline btn-accent w-full"
          >
            Book A Parcel
            {loading && <span className="loading loading-spinner"></span>}
          </button>
        </form>
      </div>
      {
        isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} data={formData} />
      }
    </div>
  );
};

export default BookParcel;
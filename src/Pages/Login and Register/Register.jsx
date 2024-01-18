import { Helmet } from "react-helmet";
import mobile from '../../assets/mobile.png'
import registers from '../../assets/register.png';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAuth from './../../Hooks/useAuth';
import axios from "axios";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import Swal from "sweetalert2";



const image_Api_Key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_Api = `https://api.imgbb.com/1/upload?key=${image_Api_Key}`;

const Register = () => {
    const { registration, updateUser } = useAuth();
    const [check, setCheck] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false)

    const form = location.state?.from?.pathname || '/';


    const onSubmit = async (data) => {
        setLoading(true)
        const imageInfo = { image: data.image[0] };
        const res = await axios.post(image_Api, imageInfo, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const image = res.data.data.display_url;
            registration(data.email, data.password)
                .then(async () => {
                    updateUser(data, image)
                    const userInfo = { ...data, image };
                    const res = await axiosPublic.post('/users', userInfo)
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Registration Successfully"
                        });
                        navigate(form, { replace: true })
                        setLoading(false)
                    }
                })
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(6, 'transparent','black','numbers');
    }, [])

    return (
        <div className="my-20 py-10 container mx-auto">
            <Helmet><title>Register</title></Helmet>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left basis-1/2">
                        <img className="hidden md:block rounded-xl lg:mb-0 mb-4" src={registers} alt="" />
                        <img className="md:hidden block rounded-lg lg:mb-0 mb-4" src={mobile} alt="" />
                    </div>
                    <div className="card shrink-0 w-full px-3 basis-1/2">
                        <h1 className="text-center font-raleway text-3xl font-bold my-7">Register Now</h1>
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
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
                                        {...register('lastName', { required: true })}
                                        type="text"
                                        id="floating_last_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    {errors.lastName?.type === "required" && (
                                        <p role="alert" className="text-sm text-red-600 mt-1">Write ypur last name*</p>
                                    )}
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
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
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /(?=.*\d{4})(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z\d\W_]{6,}/,
                                            message: 'Password must be 4 digits, 1 letter, and 1 special character, with a minimum length of 6 characters'
                                        }
                                    })}
                                    type={check ? "text" : "password"}
                                    id="floating_password"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <span className="absolute top-1/3 right-3 cursor-pointer" onClick={() => setCheck(!check)}>{check ? <IoEyeOff /> : <IoEye />}</span>
                                {errors.password?.message && (
                                    <p role="alert" className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                )}
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
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
                                <div className="relative z-0 w-full mb-5 group">
                                    <select
                                        {...register('role', { required: true })}
                                        id="countries"
                                        className="cursor-pointer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        defaultValue='default'
                                    >
                                        <option disabled value='default'>I am</option>
                                        <option>Customer</option>
                                        <option>Delivery Man</option>
                                    </select>
                                    {errors.role?.type === "required" && (
                                        <p role="alert" className="text-sm text-red-600 mt-1">Select your role*</p>
                                    )}
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor="user_avatar">Upload Your Profile Picture</label>
                                <input
                                    {...register('image', { required: true })}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none bg-transparent dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                    type="file"
                                />
                                {errors.image?.type === "required" && (
                                    <p role="alert" className="text-sm text-red-600 mt-1">Upload your Image*</p>
                                )}
                            </div>
                            <LoadCanvasTemplate reloadColor="#16A7FC" />
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register('captcha', { required: true, validate: validateCaptcha })}
                                    type="text"
                                    id="floating_captcha"
                                    className="block mt-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />

                                {errors.captcha?.type === "required" && (
                                    <p role="alert" className="text-sm text-red-600 mt-1">Write captcha*</p>
                                )}
                                {errors.captcha?.type === "validate" && (
                                    <p role="alert" className="text-sm text-red-600 mt-1">Captcha does not match</p>
                                )}
                                <label htmlFor="floating_captcha" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Write above text</label>
                            </div>
                            <button
                                type="submit"
                                className="btn text-lg btn-outline btn-accent w-full"
                            >
                                Register
                                {loading && <span className="loading loading-spinner"></span>}
                            </button>
                        </form>
                        <div className="divider">OR</div>
                        <SocialLogin />
                        <p className="text-center mt-3">Do you have account? <Link to='/login' className="hover:underline hover:text-accent">Login Here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
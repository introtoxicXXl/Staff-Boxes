import { Helmet } from "react-helmet";
import mobile from '../../assets/mobile.png'
import loginImg from '../../assets/login.png';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SocialLogin from "./SocialLogin";
import { useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [check, setCheck] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        setLoading(true)
        login(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successfully"
                });
                navigate(form, { replace: true })
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
    useEffect(() => {
        loadCaptchaEnginge(6, 'transparent','black','numbers');
    }, [])
    return (
        <div className="my-20 py-10 container mx-auto">
            <Helmet><title>Login</title></Helmet>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse basis-1/2">
                    <div className="text-center lg:text-left">
                        <img className="hidden md:block rounded-xl lg:mb-0 mb-4" src={loginImg} alt="" />
                        <img className="md:hidden block rounded-lg lg:mb-0 mb-4" src={mobile} alt="" />
                    </div>
                    <div className="card shrink-0 w-full basis-1/2 px-5">
                        <h1 className="text-center font-raleway text-3xl font-bold my-7">Login Now</h1>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register('email', { required: true })}
                                    type="email"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " />
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
                                className="btn btn-outline w-full btn-accent"
                            >
                                Login
                                {loading && <span className="loading loading-spinner"></span>}
                            </button>
                        </form>
                        <p className="text-center mt-3">New here? <Link to='/register' className="hover:underline hover:text-accent">Register</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { Helmet } from "react-helmet";
import mobile from '../../assets/mobile.png'
import registers from '../../assets/register.png';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";


const Register = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }

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
                                        {...register('firstName')}
                                        type="text"
                                        id="floating_first_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        {...register('lastName')}
                                        type="text"
                                        id="floating_last_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="floating_email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register('password')}
                                    type="password"
                                    id="floating_password"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        {...register('phoneNumber')}
                                        type="tel"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <select
                                        {...register('role')}
                                        id="countries"
                                        className="cursor-pointer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        defaultValue='default'
                                    >
                                        <option disabled value='default'>I am</option>
                                        <option>Customer</option>
                                        <option>Delivery Man</option>
                                    </select>
                                </div>

                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor="user_avatar">Upload Your Profile Picture</label>
                                <input
                                    {...register('image')}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none bg-transparent dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                    type="file"
                                />
                            </div>
                            <button type="submit" className="btn btn-outline btn-accent w-full">Register</button>
                        </form>

                        <p className="text-center mt-3">Do you have account? <Link to='/login' className="hover:underline hover:text-accent">Login Here</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
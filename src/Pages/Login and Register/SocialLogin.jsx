import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const SocialLogin = () => {
  const [loading, setLoading] = useState(false)
  const { google } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic()
  const form = location.state?.from?.pathname || '/';


  const handleGoogle = () => {
    setLoading(true)
    google()
      .then(async (res) => {
        const userInfo = {
          firstName: res.user?.displayName.split(' ')[0] || ' ',
          lastName: res.user?.displayName.split(' ')[1] || ' ',
          email: res.user?.email || ' ',
          password: res.user?.password || 'Google user',
          image: res.user.photoURL || ' ',
          phoneNumber: res.user.phoneNumber || ' ',
          role: 'Customer',
        }
        const result = await axiosPublic.post('/users', userInfo)
        if (result.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Login Successfully"
          });
          navigate(form, { replace: true })
          setLoading(false)
        }
      }).catch((err)=>{
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div>
      <button
        onClick={handleGoogle}
        className="btn w-full btn-neutral"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <path d="M19.869 10.478C19.8698 9.7966 19.8118 9.11637 19.6956 8.44479H10.1998V12.296H15.6385C15.5273 12.9111 15.2917 13.4974 14.9461 14.0197C14.6005 14.5419 14.1519 14.9893 13.6275 15.3347V17.8346H16.8734C18.774 16.0944 19.869 13.5209 19.869 10.478Z" fill="#4285F4" />
          <path d="M10.1998 20.25C12.9171 20.25 15.205 19.3639 16.8734 17.8362L13.6275 15.3364C12.7241 15.9447 11.5605 16.2919 10.1998 16.2919C7.5734 16.2919 5.3442 14.5336 4.54706 12.1643H1.20325V14.7406C2.04132 16.3967 3.32641 17.7889 4.91506 18.7618C6.5037 19.7347 8.33336 20.2499 10.1998 20.25Z" fill="#34A853" />
          <path d="M4.54701 12.164C4.12559 10.9224 4.12559 9.57793 4.54701 8.33639V5.76013H1.2032C0.498184 7.15333 0.131012 8.69096 0.131012 10.2502C0.131012 11.8094 0.498184 13.347 1.2032 14.7402L4.54701 12.164Z" fill="#FBBC04" />
          <path d="M10.1998 4.20879C11.6357 4.18549 13.0233 4.72429 14.0624 5.70872L16.9363 2.85469C15.114 1.15488 12.6998 0.221659 10.1998 0.250656C8.33336 0.250741 6.5037 0.765984 4.91506 1.73886C3.32641 2.71174 2.04132 4.10397 1.20325 5.7601L4.54706 8.33636C5.3442 5.96704 7.5734 4.20879 10.1998 4.20879Z" fill="#EA4335" />
        </svg>
        sign in with Google
        {loading && <span className="loading loading-spinner"></span>}
      </button>
    </div>
  );
};

export default SocialLogin;
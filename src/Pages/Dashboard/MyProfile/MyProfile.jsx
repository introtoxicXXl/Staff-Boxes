import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const image_Api_Key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_Api = `https://api.imgbb.com/1/upload?key=${image_Api_Key}`;

const MyProfile = () => {
  const [image, setImage] = useState(null);
  const { user, updateImage } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userStat = {} } = useQuery({
    queryKey: ['user-stat'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userStat/${user.email}`)
      return res.data;
    }
  })
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(selectedImage);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleUploadImage = async () => {
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No image selected for upload.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    const res = await axios.post(image_Api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      updateImage(res.data.data.display_url)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Image upload successfully",
          });
        })
    }

  }

  return (
    <div className="md:w-11/12 mx-auto min-h-screen flex items-center justify-evenly lg:flex-row flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap">
          <label htmlFor="imageInput" className="relative group">
            <img
              className="w-[200px] h-[200px] border-2 border-blue-300 bg-slate-500 object-cover rounded-full cursor-pointer"
              src={image || user?.photoURL}
              alt=""
            />
            <div className="bg-blue-100 w-6 h-6 p-[3px] rounded-full flex justify-center items-center absolute top-3 right-5 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:right-0 group-hover:bg-blue-100/60 duration-500 transition-all cursor-pointer">
              <svg width={40} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#0095FF"></path></g></svg>
            </div>
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <button className="btn btn-outline btn-accent btn-sm mt-5" onClick={handleUploadImage}>Upload Image</button>
      </div>
      <div>
        <div className="stats ">

          <div className="stat">
            <div className="stat-title">Total Parcel Order</div>
            <div className="stat-value text-center">{userStat?.parcelCount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Spend Money</div>
            <div className="stat-value">{userStat?.totalCost} Taka</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
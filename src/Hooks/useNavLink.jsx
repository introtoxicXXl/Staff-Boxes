import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { Link } from "react-router-dom";

const useNavLink = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role = {} } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axiosSecure(`/users/${user.email}`)
            return res.data
        }
    })
    const nav = (
        <>
            {
                role.role === 'Customer' && (
                    <>
                        <li>
                            <Link to='/Dashboard/myProfile' className='block text-center py-2 px-3 text-black rounded'>Dashboard</Link>
                        </li>
                    </>
                )
            }
            {
                role.role === 'Delivery Man' && (
                    <>
                        <li>
                            <Link to='/Dashboard/myDeliveryList' className='block text-center py-2 px-3 text-black rounded'>Dashboard</Link>
                        </li>
                    </>
                )
            }
            {
                role.role === 'Admin' && (
                    <>
                        <li>
                            <Link to='/Dashboard/adminProfile' className='block text-center py-2 px-3 text-black rounded'>Dashboard</Link>
                        </li>
                    </>
                )
            }
        </>
    )

  
  return nav;
};

export default useNavLink;
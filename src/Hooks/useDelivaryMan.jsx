import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryMan = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryMan, isPending: isDeliveryManLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryMan'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`users/deliveryMan/${user.email}`)
            return res.data.admin
        }
    })
    return [isDeliveryMan, isDeliveryManLoading]
}

export default useDeliveryMan;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliveryMan = [] } = useQuery({
        queryKey: ['deliveryMan'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/allDeliveryMan');
            return res.data;
        }
    })

    console.log(deliveryMan)
    return (
        <div className="lg:w-11/12 mx-auto my-10">
            <h1 className="text-3xl font-bold font-raleway text-center mb-5">This is All Delivery Man</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#16A7FC] text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Number of Booked Delivered</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryMan.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    {`${item.firstName} ${item.lastName}`}
                                </td>
                                <td>
                                    {item.phoneNumber}
                                </td>
                                <td>
                                    {
                                        item.deliveryCount
                                    }
                                </td>
                                <th className="flex items-center">
                                    {item.review}<FaStar className="ml-2 text-yellow-500"/>

                                </th>
                               
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMan;
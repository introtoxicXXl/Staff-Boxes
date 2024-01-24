import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CiDeliveryTruck } from "react-icons/ci";
import useAuth from "../../../Hooks/useAuth";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/userDetails`)
            return res.data;
        }
    })
    const handleMakeDeliveryAdmin = (id, role, name, item) => {
        Swal.fire({
            title: `Are you sure you want to make ${item?.firstName} ${item?.lastName} ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${id}`, { ...item, role })
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Congress",
                        text: `${item?.firstName} ${item?.lastName} is ${role} now`,
                        icon: "success"
                    });
                    refetch()
                }

            }
        });


    }

    return (
        <div className="lg:w-11/12 mx-auto my-10">
        <Helmet><title>Admin-All Users</title></Helmet>
            <h1 className="text-3xl text-center font-raleway font-bold mb-5">Total Users:{users.length}</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#16A7FC] text-white">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Number of Booked Parcel</th>
                                <th>Total spend money</th>
                                <th>Make Delivery Man</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {`${item?.firstName} ${item?.lastName}`}
                                    </td>
                                    <td>
                                        {item.phoneNumber}
                                    </td>
                                    <td>
                                        {
                                            item.numberOfParcels
                                        }
                                    </td>
                                    <th>
                                        {item.totalSpentMoney} Taka
                                    </th>
                                    <th>
                                        {
                                            item.role === 'Delivery Man' ? "Delivery Man" :
                                                item.role === 'Admin' ? "Admin" :
                                                    <button onClick={() => handleMakeDeliveryAdmin(item._id, 'Delivery Man', item.name, item)} className="btn btn-outline btn-warning">
                                                        <CiDeliveryTruck className="text-lg" />
                                                    </button>
                                        }
                                    </th>
                                    <th>
                                        {
                                            item.role === 'Admin' ? "Admin" : <button onClick={() => handleMakeDeliveryAdmin(item._id, "Admin", item.name)} className="btn btn-outline btn-warning"><FaUser className="" /></button>
                                        }
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
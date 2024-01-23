import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: iAm = [] } = useQuery({
        queryKey: ['iAm'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data
        }
    })
    const { data: lists = [], refetch } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryMan/bookedParcel/${iAm._id}`);
            return res.data;
        }
    })
    console.log(lists)

    const handleCancelDeliver = async (id, status) => {
        if (status === 'Cancel') {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Cancel it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/update/${id}`, { status })
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Cancel!",
                            text: "Your parcel has been cancel",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });
        }
        else if (status === 'Delivered') {
            const res = await axiosSecure.patch(`/update/${id}`, { status })
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Delivered!",
                    text: "Your parcel delivered successfully",
                    icon: "success"
                });
                refetch();
            }
        }
    }
    return (
        <div className="lg:w-11/12 mx-auto my-10">
            <h1 className="text-3xl text-center font-bold font-raleway bt-5">This is MyDeliveryList</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs overflow-x-scroll">
                    <thead className="bg-[#16A7FC] text-[#fff]">
                        <tr>
                            <th>#</th>
                            <th>Booked user Name</th>
                            <th>Booked Phone Number</th>
                            <th>Receiver Name</th>
                            <th>Receiver Phone</th>
                            <th>Request Date</th>
                            <th>Approximate Date</th>
                            <th>Receiver Address</th>
                            <th>View Location</th>
                            <th>Cancel</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map((parcel, indx) => (
                                <tr key={indx}>
                                    <th>{indx + 1}</th>
                                    <td>{parcel?.bookedUserName}</td>
                                    <td>{parcel?.bookedUserPhone}</td>
                                    <td>{parcel?.receiversName}</td>
                                    <td>{parcel?.receiversPhoneNumber}</td>
                                    <td>{parcel?.requestedDeliveryDate}</td>
                                    <td>{parcel?.approximateDeliveryDate}</td>
                                    <td>{parcel?.receiversAddress}</td>
                                    <td><button className="btn btn-xs btn-outline btn-accent">Location</button></td>
                                    <td>{
                                        parcel.status === 'Cancel' ? <span className="text-red-500">Cancel</span> : <button disabled={parcel.status === 'Delivered'} className="btn btn-xs btn-outline btn-error" onClick={() => handleCancelDeliver(parcel._id, 'Cancel')}>Cancel</button>
                                    }</td>
                                    <td>{parcel.status === 'Delivered' ? <span className="text-green-500">Delivered</span> : <button disabled={parcel.status === 'Cancel'} className="btn btn-xs btn-outline btn-success" onClick={() => handleCancelDeliver(parcel._id, 'Delivered')}>Delivered</button>}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;
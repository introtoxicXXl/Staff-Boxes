import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: lists = [] } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMan/bookedParcel');
            return res.data;
        }
    })
    console.log(lists)
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
                                    <td><button className="btn btn-xs btn-outline btn-error">Cancel</button></td>
                                    <td><button className="btn btn-xs btn-outline btn-success">Delivered</button></td>
                                    
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
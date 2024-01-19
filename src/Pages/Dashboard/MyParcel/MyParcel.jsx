import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcel-data', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`bookParcel/${user.email}`);
      return res.data
    }
  })
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel your parcel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/cancel/${id}`);
        refetch()
        Swal.fire({
          title: "Cancel!",
          text: "Your parcel has been cancel.",
          icon: "success"
        });
      }
    });

  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'black';
      case 'On The Way':
        return 'blue';
      case 'Delivered':
        return 'green';
      case 'Cancel':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="md:w-11/12 mx-auto my-10">
      <h1 className="text-3xl text-center font-bold font-raleway mb-5">All My Parcel</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-md overflow-x-scroll">
            <thead className="bg-[#16A7FC] text-[#fff]">
              <tr>
                <th>#</th>
                <th>Parcel Type</th>
                <th>Request Delivery Date</th>
                <th>Approximate Date</th>
                <th>Booking Date</th>
                <th>Delivery Man Id</th>
                <th>Booking Status</th>
                <th>Update</th>
                <th>Cancel</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {
                parcels.map((parcel, indx) => (
                  <tr key={indx}>
                    <th>{indx + 1}</th>
                    <td>{parcel?.parcelType}</td>
                    <td>{parcel?.requestDate}</td>
                    <td>{parcel?.approximateDate}</td>
                    <td>{parcel?.bookingDate}</td>
                    <td>{parcel?.deliveryManId}</td>
                    <td style={{ color: getStatusColor(parcel.status) }}>{parcel?.status}</td>
                    <td><button onClick={() => navigate(`/dashboard/myParcel/${parcel._id}`)} disabled={parcel.status !== "Pending"} className="btn btn-xs btn-warning text-[#fff]">update</button></td>
                    <td><button disabled={parcel.status !== "Pending"} onClick={() => handleCancel(parcel._id)} className="btn btn-xs btn-error text-[#fff]">cancel</button></td>
                    <td><button className="btn btn-xs btn-success text-[#fff]" disabled={parcel.status !== "Delivered"}>pay</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcel;
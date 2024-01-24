import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";

const MyParcel = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcel-data', user.email, selectedStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(`bookParcel/${user.email}?status=${selectedStatus}`);
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
  const handleReviewClick = (id) => {
    setSelectedParcel(id);
    setOpenModal(true);
  };
  return (
    <div className="md:w-11/12 mx-auto my-10">
      <h1 className="text-3xl text-center font-bold font-raleway mb-5">All My Parcel</h1>
      <div className="mb-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter by status</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select select-bordered">
            <option value='All'>All</option>
            <option value='Pending'>Pending</option>
            <option value='On The Way'>On The Way</option>
            <option value='Cancel'>Cancel</option>
            <option value='Delivered'>Delivered</option>
          </select>
        </label>
      </div>
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
                <th>Review</th>
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
                    <td><button className="btn btn-xs btn-success text-[#fff]" onClick={() => navigate(`/dashboard/payment/${parcel._id}`)} disabled={parcel.status !== "Delivered" || parcel.paymentStatus === 'Success'}>pay</button></td>
                    <td><button onClick={() => handleReviewClick(parcel.deliveryManId)} className="bg-gray-700 text-white rounded-lg btn-xs btn cursor-pointer" disabled={parcel?.paymentStatus !== "Success"}>Review</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        openModal && <ReviewModal openModal={openModal} setOpenModal={setOpenModal} item={selectedParcel} />
      }
    </div>
  );
};

export default MyParcel;
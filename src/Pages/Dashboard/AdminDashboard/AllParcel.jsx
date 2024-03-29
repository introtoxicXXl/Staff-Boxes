import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import CustomModal from "../../../Components/CustomMohal/CustomModal";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const AllParcel = () => {
  const { loading } = useAuth()
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [modalData, setModalData] = useState({});
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcel-data'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allBookParcel`, {
        params: { dateFrom, dateTo }
      });
      return res.data
    }
  })
  const openModal = (item) => {
    setModalData(item)
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const handleFilterButtonClick = () => {
    refetch();
  };
  return (
    <div className="lg:w-11/12 mx-auto my-10">
    <Helmet><title>Admin-All Parcel</title></Helmet>
      <h1 className="text-3xl text-center font-raleway font-bold mb-5">This is All Parcel</h1>
      <div className="flex justify-center">
        <div className="mb-4 flex space-x-4 items-end md:flex-row flex-col">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date From</span>
            </div>
            <input type="date" placeholder="Type here" className="input cursor-pointer input-bordered w-full max-w-xs" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date To</span>
            </div>
            <input type="date" placeholder="Type here" className="input cursor-pointer input-bordered w-full max-w-xs" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </label>
          <button onClick={handleFilterButtonClick} className="btn mt-3 btn-accent btn-outline">Filter</button>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-md overflow-x-scroll">
            <thead className="bg-[#16A7FC] text-[#fff]">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Phone Number</th>
                <th>Booking Date</th>
                <th>Request Date Date</th>
                <th>Cost(Taka)</th>
                <th>Booking Status</th>
                <th>Manage Parcel</th>
              </tr>
            </thead>
            <tbody>
              {
                parcels.map((parcel, indx) => (
                  <tr key={parcel._id}>
                    <th>{indx + 1}</th>
                    <td>{`${parcel?.firstName} ${parcel?.lastName}`}</td>
                    <td>{parcel?.phoneNumber}</td>
                    <td>{parcel?.bookingDate}</td>
                    <td>{parcel?.requestDate}</td>
                    <th>{parcel?.price}</th>
                    <td style={{ color: getStatusColor(parcel.status) }}>{parcel?.status}</td>
                    <td><button className="btn btn-xs btn-outline btn-neutral" onClick={() => openModal(parcel)}>Mange Parcel
                    </button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {
          isModalOpen && <CustomModal isOpen={isModalOpen} onClose={closeModal} parcel={modalData} refetch={refetch} />
        }
      </div >
    </div >
  );
};

export default AllParcel;
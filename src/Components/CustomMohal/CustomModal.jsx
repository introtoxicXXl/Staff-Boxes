import "react-datepicker/dist/react-datepicker.css";
import { PropTypes } from 'prop-types';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const CustomModal = ({ isOpen, onClose, parcel, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: items = [] } = useQuery({
    queryKey: ['manageItem'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/manageParcel')
      return res.data;
    }
  })
  const onSubmit = (data) => {
    axiosSecure.patch(`/admin/updateParcel/${parcel?._id}`, { ...data })
    refetch();
    onClose()
  }
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box lg:w-1/3 max-w-5xl">
        <h3 className="font-bold text-lg text-center font-raleway">Manage Parcel</h3>
        <p className="py-4"></p>
        <div className="">
          <form method="dialog" className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <select
              {...register('deliveryManId')}
              className="select select-bordered w-full select-sm"
            >
              <option disabled>Select Delivery Man</option>
              {Array.isArray(items) ? (
                items.map(item => (
                  <option key={item._id} value={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                ))
              ) : (
                <p>Data is not in the expected format</p>
              )}
            </select>
            <select
              {...register('status')}
              className="select select-bordered w-full select-sm"
              defaultValue={parcel?.status}>
              <option disabled >Select Status</option>
              <option>Pending</option>
              <option>On The Way</option>
              <option>Cancel</option>
              <option>Delivered</option>
            </select>
            <input {...register('deliveryDeadLine', { required: true })} type="date" defaultValue={parcel?.approximateDate} className="input input-bordered input-primary w-full input-sm" />
            {errors.deliveryDeadLine?.type === "required" && (
              <p role="alert" className="text-sm text-red-600 mt-1">Select Delivery Deadline*</p>
            )}
            <button className="btn">
              Ok
            </button>
          </form>

          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </dialog>
  );
};
CustomModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.boolean,
  parcel: PropTypes.object,
  refetch: PropTypes.func
}

export default CustomModal;
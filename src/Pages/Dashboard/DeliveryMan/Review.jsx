import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Rating } from "@smastrom/react-rating";

const Review = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: reviews = {} } = useQuery({
    queryKey: ['deliveryMan-review'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/deliveryMan/review/${user.email}`)
      return res.data
    }
  })


  const reviewItems = reviews.reviews?.map(item => (
    <div key={item._id} className=" bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md">
      <img className="w-[350px] h-[190px] bg-gray-400 rounded-2xl" src={item?.userPhoto} alt="" />
      <div className="space-y-2">
        <h2 className="text-slate-800 font-medium md:text-xl sm:text-lg ">{item?.userName}</h2>
        <p>{item?.reviewText}</p>
        <Rating
          style={{ maxWidth: 100 }}
          value={item.rating}
          readOnly
        />
      </div>
    </div>
  ));

  return (
    <div className="lg:w-11/12 mx-auto my-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {reviewItems}
      </div>
    </div>
  );
};

export default Review;
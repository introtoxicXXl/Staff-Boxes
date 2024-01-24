
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { Rating } from '@smastrom/react-rating';
const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();
  const { data: topDeliveryMan = [] } = useQuery({
    queryKey: ['topDeliveryMan'],
    queryFn: async () => {
      const res = await axiosPublic.get('/topDeliveryMan');
      return res.data;
    }
  })

  return (
    <div className="container mx-auto my-10">
      <h1 className="lg:text-5xl md:text-4xl text-3xl text-center font-raleway font-bold mb-5">Top Delivery Man</h1>
      <div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
          {
            topDeliveryMan.map(item =>
              <div key={item._id} className="p-6 md:p-8 shadow-md rounded-2xl space-y-8">
                <div className="relative">
                  <img className="w-full h-full rounded-2xl " src="https://source.unsplash.com/350x150/?northern lights" alt="" />
                  <img className="w-[100px] h-[100px] absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border border-white" src={item.image} alt="" />
                </div>
                {/* profile name & role */}
                <div className="pt-8 text-center space-y-1">
                  <h1 className="text-xl md:text-2xl">{`${item.firstName} ${item.lastName}`}</h1>
                  <p className="text-gray-400 text-sm">Best Delivery Man</p>
                </div>
                {/* post , followers following  */}
                <div className="flex flex-wrap px-4  md:px-8 justify-evenly items-center">
                  <div className="text-center">
                    <h5 className="font-medium text-xl">{item.totalDeliveryCount}</h5>
                    <p className="text-sm  text-gray-400">Total Delivery</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-xl">{item.averageRating.toFixed(1)}</h5>
                    <p className="text-sm  text-gray-400"><Rating
                      style={{ maxWidth: 100 }}
                      value={item?.averageRating}
                      readOnly
                    /></p>
                  </div>
                </div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
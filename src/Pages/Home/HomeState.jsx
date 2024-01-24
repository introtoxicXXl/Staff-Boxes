import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const HomeState = () => {
  const axiosPublic = useAxiosPublic();
  const { data:homeStat={} } = useQuery({
    queryKey: ['homeStat'],
    queryFn: async () => {
      const res = await axiosPublic.get('/home-stat');
      return res.data
    }
  })
  return (
    <div className="container mx-auto my-20 flex justify-center">
      <div className="stats shadow lg:w-2/3 stats-vertical md:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value text-primary">{homeStat?.totalUser}</div>
          <div className="stat-desc">20% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Total Delivery</div>
          <div className="stat-value text-secondary">{homeStat?.totalDeliveredCount}</div>
          <div className="stat-desc">54% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-value">{homeStat?.deliveredPercentage}%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">{homeStat?.remainingPercentage} tasks remaining</div>
        </div>

      </div>
    </div>
  );
};

export default HomeState;
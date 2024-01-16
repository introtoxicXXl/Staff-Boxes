import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Feature from "./Feature";
import HomeState from "./HomeState";
import TopDeliveryMan from "./TopDeliveryMan";
import OurService from "./OurService";

const Home = () => {

    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <Feature/>
            <HomeState/>
            <TopDeliveryMan/>
            <OurService/>
        </div>
    );
};

export default Home;
import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Feature from "./Feature";
import HomeState from "./HomeState";
import TopDeliveryMan from "./TopDeliveryMan";
import OurService from "./OurService";
import FeatureVideo from "./FeatureVideo";

const Home = () => {

    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <Feature/>
            <HomeState/>
            <TopDeliveryMan/>
            <OurService/>
            <FeatureVideo/>
        </div>
    );
};

export default Home;
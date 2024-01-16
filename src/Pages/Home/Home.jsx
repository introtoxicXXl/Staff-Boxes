import { Helmet } from "react-helmet";
import Banner from "./Banner";

const Home = () => {

    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
        </div>
    );
};

export default Home;
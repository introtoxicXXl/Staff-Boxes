import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Feature from "./Feature";

const Home = () => {

    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <Feature/>
        </div>
    );
};

export default Home;
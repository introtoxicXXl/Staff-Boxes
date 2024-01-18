import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from './../Components/Loader/Loader';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ children }) => {
    const {user,loading}=useAuth();
    const location = useLocation();

        if(loading){
            return <Loader/>
        }
        if(user){
            return children;
        }
        return <Navigate to='/login' state={{from:location}}/>
};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;
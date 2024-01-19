import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { PropTypes } from 'prop-types';
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Components/Loader/Loader";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()

    if (loading || isAdminLoading) {
        return <Loader/>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' />
};
AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;
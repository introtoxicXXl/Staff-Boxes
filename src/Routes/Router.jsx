import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Pricing from "../Pages/Pricing/Pricing";
import Register from "../Pages/Login and Register/Register";
import Login from "../Pages/Login and Register/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import BookParcel from "../Pages/Dashboard/BookParcel/BookParcel";
import MyParcelUpdate from "../Pages/Dashboard/MyParcel/MyParcelUpdate";
import AllUser from "../Pages/Dashboard/AdminDashboard/AllUser";
import AllParcel from "../Pages/Dashboard/AdminDashboard/AllParcel";
import AllDeliveryMan from "../Pages/Dashboard/AdminDashboard/AllDeliveryMan";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile";
import MyDeliveryList from "../Pages/Dashboard/DeliveryMan/MyDeliveryList";
import AdminRoute from './AdminRoute';
import Review from "../Pages/Dashboard/DeliveryMan/Review";
import Payment from "../Pages/Dashboard/MyParcel/Payment";
 const Router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/pricing',
          element:<Pricing/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          path:'/dashboard/myProfile',
          element:<MyProfile/>
        },
        {
          path:'/dashboard/myParcel',
          element:<MyParcel/>
        },
        {
          path:'/dashboard/bookParcel',
          element:<BookParcel/>
        },
        {
          path:'/dashboard/myParcel/:id',
          element:<MyParcelUpdate/>
        },
        {
          path:'/dashboard/payment/:id',
          element:<Payment/>
        },


        

        // admin dashboard 
        {
          path:'/dashboard/allUser',
          element:<AdminRoute><AllUser/></AdminRoute>
        },
        {
          path:'/dashboard/allParcel',
          element:<AdminRoute><AllParcel/></AdminRoute>
        },
        {
          path:'/dashboard/allDeliveryMan',
          element:<AdminRoute><AllDeliveryMan/></AdminRoute>
        },
        {
          path:'/dashboard/adminProfile',
          element:<AdminRoute><AdminProfile/></AdminRoute>
        },


        // delivery Man dashboard 
        {
          path:'/dashboard/myDeliveryList',
          element:<MyDeliveryList/>
        },
        {
          path:'/dashboard/review',
          element:<Review/>
        }
      ]
    }
  ]);

  export default Router;
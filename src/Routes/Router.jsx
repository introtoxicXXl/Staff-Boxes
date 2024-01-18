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
      ]
    }
  ]);

  export default Router;
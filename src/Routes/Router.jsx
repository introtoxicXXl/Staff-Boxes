import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Pricing from "../Pages/Pricing/Pricing";
import Register from "../Pages/Login and Register/Register";
import Login from "../Pages/Login and Register/Login";
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
  ]);

  export default Router;
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Pricing from "../Pages/Pricing/Pricing";
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
        }
      ]
    },
  ]);

  export default Router;
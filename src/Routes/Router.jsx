import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
 const Router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        }
      ]
    },
  ]);

  export default Router;
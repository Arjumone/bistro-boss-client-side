import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Cart from "../Pages/DashBoard/Cart/Cart";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import DashBoard from "../Layout/DashBoard";
import AddItems from "../Pages/DashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/DashBoard/ManageItem/ManageItem";
import UpdateItem from "../Pages/DashBoard/UpdateItem/UpdateItem";
// import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[

        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/menu',
            element:<Menu></Menu>
        },
        {
            path:'/order/:category',
            element:<Order></Order>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
      ]
    },
    {
        path:"dashboard",
        element: <DashBoard></DashBoard>, //ata privateRoute korte hobe
        children:[
            // normal user routes
            {
                path:"cart",
                element:<Cart></Cart>
            },

            // admin only routes
            {
                path:'addItems',
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:"manageItems",
                element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path:"updateItem/:id",
                element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path:"users",
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
        ]
    }
  ]);
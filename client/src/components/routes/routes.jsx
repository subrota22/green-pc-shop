import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Main/DashboardLayout/DashboardLayout";
import MainLayOut from "../../Main/MainLayOut/MainLayOut";
import AdminPrivateRouter from "../../PrivaterRouters/AdminPrivateRouter/AdminPrivateRouter";
import BuyerPrivateRouter from "../../PrivaterRouters/BuyerPrivateRouter/BuyerPrivateRouter";
import SellerPrivateRouter from "../../PrivaterRouters/SellerPrivateRouter/SellerPrivateRouter";
import UserPrivateRouter from "../../PrivaterRouters/UserPrivateRouter/UserPrivateRouter";
import AddProuduct from "../Dashboard/AddProduct/AddProuduct";
import AllBuyers from "../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Dashboard/AllSellers/AllSellers";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import MyBuyers from "../Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import RepotedItems from "../Dashboard/RepotedItems/RepotedItems";
import WishList from "../Dashboard/WishList/WishList";
import AllAvailableProducts from "../Pages/AllAvailableProducts/AllAvailableProducts";
import Blogs from "../Pages/Blogs/Blogs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddCategory from "../Pages/Home/AddCategory/AddCategory";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Payment from "../Pages/Payment/Payment";
import Profile from "../Pages/Profile/Profile";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import WishListPayment from "../Pages/WishListPayment/WishListPayment";
export const routes = createBrowserRouter([
    {
        path: "/", element: <MainLayOut></MainLayOut>, children: [
            {
                path: "/", element: <Home></Home>
            }
            ,
            {
                path: "/register", element: <Register></Register>
            }
            ,
            {
                path: "/login", element: <Login></Login>
            }
            ,
            {
                path:"/reset-password" , element:<ResetPassword></ResetPassword>
            }
            , {
                path: "/add-categories", element: <SellerPrivateRouter> <AddCategory></AddCategory></SellerPrivateRouter>
            },
            {
                path: "/available-products/:id",
                loader: async ({ params }) =>
                    fetch(`https://computer-sell.vercel.app/availAbleProducts/${params.id}`, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                        }
                    }),
                element: <BuyerPrivateRouter><AllAvailableProducts></AllAvailableProducts></BuyerPrivateRouter>
            },
            {
                path: "/payments/:id",
                loader: async ({ params }) =>
                    fetch(`https://computer-sell.vercel.app/productPayment/${params.id}`, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                        }
                    }),
                element: 
               <BuyerPrivateRouter><Payment></Payment></BuyerPrivateRouter>
            },

            {
                path: "/wishListproductPayment/:id",
                loader: async ({ params }) =>
                    fetch(`https://computer-sell.vercel.app/wishListproductPayment/${params.id}`, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
                        }
                    }),
                element: 
                <BuyerPrivateRouter> <WishListPayment></WishListPayment></BuyerPrivateRouter>
            },

            {
                path: "/blogs", element: <Blogs></Blogs>
            },
            {
           path:"/profile"  ,  element : <Profile></Profile>
            } ,
            {
                path: "*", element: <ErrorPage></ErrorPage>
            }
        ]
    },

    {
        path: "/dashboard", element: <DashboardLayout></DashboardLayout>, children: [
            {
                path: "/dashboard", element: <UserPrivateRouter><DashboardHome></DashboardHome></UserPrivateRouter>
            }
            ,
            {
                path: "/dashboard/my-products", element: 
               <SellerPrivateRouter> <MyProducts></MyProducts></SellerPrivateRouter>
            },
            {
                path: "/dashboard/add-product", element: 
                <SellerPrivateRouter><AddProuduct></AddProuduct></SellerPrivateRouter>
            },
            {
                path: "/dashboard/my-buyers", element: <SellerPrivateRouter>
                    <MyBuyers></MyBuyers>
                </SellerPrivateRouter>
            },

            {
                path: "/dashboard/repoted-items", element: 
                <AdminPrivateRouter><RepotedItems></RepotedItems></AdminPrivateRouter>
            },
          
            {
                path: "/dashboard/all-buyers", element: 
                <AdminPrivateRouter><AllBuyers></AllBuyers></AdminPrivateRouter>
            },
            {
                path: "/dashboard/all-sellers", element: 
                <AdminPrivateRouter><AllSellers></AllSellers></AdminPrivateRouter>
            },
            {
                path: "/dashboard/my-orders", element:
                <BuyerPrivateRouter> <MyOrders></MyOrders> </BuyerPrivateRouter> 
            },
            {
             path : "/dashboard/wishtList" , element: 
             <BuyerPrivateRouter><WishList></WishList></BuyerPrivateRouter>
            } ,
            {
                path: "*", element: <ErrorPage></ErrorPage>
            }

        ]
    }

])
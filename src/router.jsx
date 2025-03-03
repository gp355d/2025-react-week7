import { createHashRouter  } from "react-router-dom";
import FrontEndLayout from './layout/frontEndlayout';
import BackEndlyout from "./layout/blackEndlayout";
// import Home from './views/Home';
import SingleProduct from "./views/Dashboard/SingleProduct";
// import About from './views/About';
import Prouduct from './views/Dashboard/Prouduct';
import Cart from "./views/Dashboard/Cart";
import Login from "./views/Login";
import ProductPage from "./views/admin/ProductPage";
import Order from "./views/admin/Order";
import NotFound from "./views/Notfound";
export const router = createHashRouter([
  {
    path: '/',
    element: <FrontEndLayout />,
    children: [
      {
        path: 'product',
        element: <Prouduct />
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <BackEndlyout />,
    children: [
      {
        path: 'products',
        element: <ProductPage />
      },
      {
        path: 'order',
        element: <Order />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
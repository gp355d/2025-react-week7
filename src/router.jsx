import { createHashRouter  } from "react-router-dom";
import FrontEndLayout from './layout/frontEndlayout';
import BackEndlyout from "./layout/blackEndlayout";
// import Home from './views/Home';
import SingleProduct from "./views/SingleProduct";
// import About from './views/About';
import Prouduct from './views/Prouduct'
import Cart from "./views/Cart";
import Login from "./views/Login";
import ProductPage from "./views/ProductPage";
import Order from "./views/Order";
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
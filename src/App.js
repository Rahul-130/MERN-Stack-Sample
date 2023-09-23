
import './App.css';
import RootLayout from './RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Aboutus from './components/aboutus/Aboutus'
import ErrorPage from './components/ErrorPage'
import UserProfile from './components/user-profile/UserProfile'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path:"/",
          element: <Home />
        },
        {
          path:'/login',
          element: <Login />
        },
        {
          path:'/signup',
          element: <Signup />
        },
        {
          path:'/aboutus',
          element: <Aboutus />
        },
        {
          path:'/user-profile',
          element: <UserProfile />,
          children:[
            {
              path:"products",
              element: <Products />
            },
            {
              path: "cart",
              element: <Cart />
            }
          ]
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Component/Layout/Main.jsx';
import Home from './Component/Home/Home.jsx';
import Login from './Component/Login/Login.jsx';
import Register from './Component/Register/Register.jsx';
import AuthProviders from './Component/Providers/AuthProviders';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Orders from './Component/Orders/Orders';
import Profile from './Component/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile/></PrivateRoute>
      },
      {
        path: "/orders",
        element: <PrivateRoute><Orders/></PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProviders><RouterProvider router={router} /></AuthProviders>
  </React.StrictMode>,
)

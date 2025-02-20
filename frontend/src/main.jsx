import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import Dashboard from "./components/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import Signin from "./components/Signin.jsx";
import SignUpPage from "./components/Signup.jsx";
import Send from "./components/Send.jsx";
import Cookies from 'js-cookie';
const token = Cookies.get('token');

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/signup",
    element: <SignUpPage/>,
  },
  {
    path: "/signin",
    element:  <Signin /> ,
  },{
    path : '/send',
    element : <Send /> 
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
      <Toaster />
    </RouterProvider>
  </React.StrictMode>
);

import React from 'react'
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';
const ProtectRoute = () => {
    const token = Cookies.get('token');
  return  token ? <Outlet/> : <Navigate to='/login' />
}

export default ProtectRoute
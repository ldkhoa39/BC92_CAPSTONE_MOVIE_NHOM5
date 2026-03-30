import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

export default function AdminTemplate() {

  const { data } = useSelector((state) => state.authReducer);

  // neu data la null thi da ve trang /auth

  if(data){
    return <Navigate to="/auth"/>;
  }

  return (
    <div>
        Header
        <Outlet />
        footer
    </div>
  );
}

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import HomePage from './pages/home';
// const PrivateRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth);
//   return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>;
// };

// const RestrictedRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth);
//   return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>;
// };

const App = () => {

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
  
  );
};

export default App;
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../UserComponents/Home'
import Shop from '../UserComponents/Shop'
import Registration from '../UserComponents/Registration'
import Login from '../UserComponents/Login'
import ManageProfile from '../UserComponents/ManageProfile'
import SingleProduct from '../UserComponents/SingleProduct'
import Header from '../UserComponents/Header'
import Cart from '../UserComponents/Cart'
import Footer from '../UserComponents/Footer'
import Checkout from '../UserComponents/Checkout'
import OrderSuccess from '../UserComponents/OrderSuccess'
import MyOrders from '../UserComponents/MyOrder'
import Payment from '../UserComponents/Payment'
import ContextProvider from '../../../ContextProvider'

export default function UserRoutes() {
  const location=useLocation();
  const noHeaderPaths=['/Login' , '/Registration', '/ManageProfile'];

  const showHeader= !noHeaderPaths.includes(location.pathname);
  return (

   <>
   {showHeader && <Header />}
   
   <Routes>
    <Route  path="/"  element={<Home/>}/>
    <Route  path="/Shop"  element={<Shop/>}/>
    <Route  path="/Registration"  element={<Registration/>}/>
    <Route  path="/Login"  element={<Login/>}/>
    <Route  path="/ManageProfile"  element={<ManageProfile/>}/>
    <Route path="/product/:id" element={<SingleProduct />} />
   <Route path="/Cart" element={<Cart/> } />
   <Route path="/Checkout" element={<Checkout/> } />
   <Route path="/MyOrders" element={<MyOrders/> } />
   <Route path="/OrderSuccess" element={<OrderSuccess/> } />
   <Route path="/Payment" element={<Payment/> } />
   <Route path="/Footer" element={<Footer/> } />
   

    </Routes>
   </>
  )
}

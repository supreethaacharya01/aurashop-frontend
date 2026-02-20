import React from 'react'
import ClippedDrawer from '../AdminComponents/ClippedDrawer'
import { Routes,Route } from 'react-router-dom'
import Dashboard from '../AdminComponents/Dashboard'
import Viewuser from '../AdminComponents/Viewuser'
import AddProduct from '../AdminComponents/Addproduct'
import ViewProduct from '../AdminComponents/ViewProduct'
import ViewCategoty from '../AdminComponents/ViewCategoty'
import UpdateCategory from '../AdminComponents/Updatecategory'
import AddCategory from '../AdminComponents/AddCategory'
import Updateproduct from '../AdminComponents/Updateproduct'
import AdminLogin from '../AdminComponents/AdminLogin'
import AdminOrderView from '../AdminComponents/AdminOrderView'


export default function AdminRouter() {
  return (
    <div>
      <ClippedDrawer/>

      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/Dashboard" element={< Dashboard/>} />
        <Route path="/Viewuser" element={< Viewuser/>} />
        <Route path="/AddProduct" element={< AddProduct/>} />
        <Route path="/ViewProduct" element={< ViewProduct/>} />
        <Route path="/ViewCategoty" element={< ViewCategoty/>} />
        <Route path="/UpdateCategory/:cid" element={< UpdateCategory/>} />
        <Route path="/AddCategory" element={< AddCategory/>} />
        <Route path="/Updateproduct/:pid" element={< Updateproduct/>} />
        <Route path="/AdminOrderView" element={< AdminOrderView/>} />

      </Routes>
    </div>
  )
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./login"
import Addproduct from "./Addproduct"
import AdminAxios from "./adminAxios"
import Header from "./Header"
import { useState } from "react"
import UserRouting from "../UserComponent/UserRouting"
import UserLogin from "../UserComponent/UserLogin"
import AddToCart from "../UserComponent/AddToCart"
import ForgetPassword from "../UserComponent/ForgetPassword"
import ResetPassword from "../UserComponent/ResetPassword"
import Forgetpass from "../UserComponent/Forgetpass"




function Routing() {
  const [auth, setAuth] = useState(localStorage.getItem('token'))
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<Header />} >
            <Route path='login' element={<Login setAuth={setAuth} />} />
            <Route path='add' element={auth ? <Addproduct /> : <Navigate to='/admin/login' />} />
            <Route path='show' element={auth ? <AdminAxios /> : <Navigate to='/admin/login' />} />
          </Route>
          <Route path="/" element={<UserRouting />}>
          </Route>
          <Route path="login" element={<UserLogin />} />
          <Route path='forget' element={<ForgetPassword />}>
            
          </Route>
          <Route path="reset" element={<ResetPassword />} />
          <Route path="cart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing

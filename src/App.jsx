import { Route, Routes } from "react-router-dom"
import Home from "./users/pages/Home"
import Auth from "./pages/Auth"
import PageNotFound from "./pages/PageNotFound"
import { useEffect, useState } from "react"
import Preloader from "./components/Preloader"
import Conta from "./users/pages/Conta"
import AllBooks from "./users/pages/AllBooks"
import Profile from "./users/pages/Profile"
import EditProfile from "./users/components/EditProfile"
import Ahome from "./admin/pages/Ahome"
import AdminBooks from "./admin/pages/AdminBooks"
import AdminSettings from "./admin/pages/AdminSettings"
import AdminSideBar from "./admin/components/AdminSideBar"
import Viewbook from "./users/pages/Viewbook"
import PaymentSuccess from "./users/pages/PaymentSuccess"
import PaymentError from "./users/pages/PaymentError"



function App() {

  const [loading,setLloading] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setLloading(true)
    },4000)
  },[])

  return (
    <>
    <Routes>

      {/*home page with loading*/}
      <Route path="/" element={loading ? <Home/> : <Preloader/>}/>
      <Route path="/login" element={<Auth/>}/>
      <Route path="/register" element={<Auth register/>}/>
      <Route path="/conta" element={<Conta/>}/>
      {/*<Route path="/caree" element={<Caree/>}/>*/}
      <Route path="/all-books" element={<AllBooks/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/view-books/:id" element={<Viewbook/>}/>

      <Route path="/edit-profile" element={<EditProfile/>}/>

      {/*admin page with loading*/}
      <Route path="/admin-home" element={loading ? <Ahome/> : <Preloader/>}/>
      <Route path="/admin-books" element={<AdminBooks/>}/>
      <Route path="/admin-settings" element={<AdminSettings/>}/>
      <Route path="/admin-sidebar" element={<AdminSideBar/>}/>


      <Route path="/payment-success" element={<PaymentSuccess/>}/>
      <Route path="/payment-error" element={<PaymentError/>}/>

      
      
      
      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
     
    </>
  )
}

export default App

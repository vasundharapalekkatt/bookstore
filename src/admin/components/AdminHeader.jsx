import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {

  const navigate = useNavigate()

  //logout
  const logout = ()=> {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate("/")
  }
  return (
    <>
      <div className='flex justify-between px-20 p-3'>
        <div className='flex items-center'>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/001/761/774/small/stack-of-books-on-white-background-free-vector.jpg" alt="icon" style={{ width: "50px", height: "50px" }} />
          <h1 className='ms-3 font-medium text-2xl'>BOOKSTORE</h1>
        </div>
        <button onClick={logout} className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='me-3' />LogOut</button>
      </div>
      <marquee direction="left" className="p-3 bg-gray-900 text-white">
        Welcome to our app! We’re excited to have you join us on this journey. Explore all the features designed to make your experience simple and enjoyable. Let’s get started and make something amazing together!
      </marquee>
    </>
  )
}

export default AdminHeader
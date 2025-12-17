import React, { useEffect, useState } from 'react'
import AdminSideBar from '../components/AdminSideBar'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import { approveBooksAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allApi';
import { toast } from 'react-toastify';

const AdminBooks = () => {
  const [bookStatus,setbookStatus] = useState(true)
  const [userBookStatus,setuserBookStatus] = useState(false)

  const [bookDetails, setBookDetails] = useState([])
  const [token,setToken] =useState("");
  const [approveStatus,setApproveStatus] = useState(false)
  const [users,setUsers] = useState([])
  

  // Fetch Books
  const getAllBooksAdmin = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };
    

    const result = await getAllBooksAdminAPI(reqHeader)
    console.log(result.data);

    if (result.status === 200) {
      setBookDetails(result.data)
    }
  }

  const approveBook = async(data)=>{
    const reqHeader = {
      "Authorization":`Bearer ${token}`,
    };
    const result = await approveBooksAPI(reqHeader,data)
    console.log(result.data);
    if (result.status == 200) {
      setApproveStatus(true)
    }else{
      alert("something went wrong")
    }

  }

  const getAllUsers = async()=>{
    const reqHeader ={
      "Authorization":`Bearer ${token}`,
    };
    const result = await getAllUsersAPI(reqHeader)
    console.log(result);
    if (result.status ==200) {
      setUsers(result.data)
    }
  }



  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      getAllBooksAdmin(token)
    }
    if (userBookStatus == true) {
      getAllUsers()
    }
  }, [approveStatus,userBookStatus])


  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_4fr]">
        <div className="bg-blue-200">
          <AdminSideBar />
        </div>

        <div className="w-full px-10 py-6">

          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-center mb-6">All Books</h1>

          {/* Tabs */}
          <div className='md:px-40'>
        <div className='flex justify-center items-center my-5'>
          <p onClick={() => { setbookStatus(true); setuserBookStatus(false) }} className={bookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' :  'p-4 border-b text-black border-gray-200 rounded cursor-pointer'}> Books</p>

          <p onClick={() => { setbookStatus(false); setuserBookStatus(true)}} className={userBookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' :'p-4 border-b text-black border-gray-200 rounded cursor-pointer' }>User</p>

        
        </div>
      </div>





          {/* Books Grid */}
          {bookStatus && 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {bookDetails.length > 0 &&
              bookDetails.map((item) => (
                <div
                  key={item._id}   // ✅ USING UNIQUE ID AS KEY
                  className="bg-gray-100 shadow rounded-lg p-6 flex flex-col items-center"
                >

                  {/* ID */}
                  <p className="text-black text-xl mb-2">
                    ID : {item._id}
                  </p>

                  {/* Book Image */}
                  <div className="w-20 h-20 bg-gray-300  flex justify-center items-center overflow-hidden">
                    <img
                      src={item.imageurl}
                      alt="book"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Author */}
                  <p className="text-orange-600 text-lg">{item.author}</p>

                  {/* Price */}
                  <p className="text-black text-lg font-semibold">₹{item.dprice}</p>

                  {/* Approve Button */}
                  {item?.status =="pending" && 
                  <button onClick={()=>approveBook(item)}
                    className="mt-4 border border-green-600 text-black px-4 py-2 rounded-lg hover:bg-green-700  hover:text-white transition-all"
                  >
                    Approve
                  </button>}

                  {item?.status =="approved" &&
                  <div className='flex justify-end w-full'>
                    <img src="https://media.istockphoto.com/id/691856234/vector/flat-round-check-mark-green-icon-button-tick-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=hXL5nXQ2UJlh4yzs2LyZC4GtctQG0fs-mk30GPPbhbQ=" alt="approved" style={{width:'30px',height:'30px'}}/>
                  </div>}

                </div>
              ))
            }

          </div>}

           {userBookStatus && 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            
                {users?.length > 0 ?
                users?.map((user)=>(
                   <div
                  className="bg-gray-100 shadow rounded-lg p-6 flex flex-col items-center"
                >

                  {/* ID */}
                  <p className="text-black text-xl mb-2">
                    ID : {user?._id}
                  </p>

                  {/* Book Image */}
                  <div className="w-20 h-20 bg-gray-300  flex justify-center items-center overflow-hidden">
                    <img
                      src={user?.profile == ""? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" :user?.profile}
                      alt="book"
                      
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* username */}
                  <p className="text-orange-600 text-lg">{user?.username}</p>

                  {/* email */}
                  <p className="text-black text-lg font-semibold">{user?.email}</p>

                </div>
                ))
               
                :
                <p>no users</p>
                }
          </div>}



        </div>
      </div>

      <Footer />
    </>
  )
}

export default AdminBooks

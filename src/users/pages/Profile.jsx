import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookAPI, deleteAUserBookAPI, getAllUserBooksAPI, getAllUserBroughtBooksAPI } from '../../services/allApi'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Profile = () => {

  const [sellStatus, setsellStatus] = useState(true)
  const [userBookStatus, setuserBookStatus] = useState(false)
  const [purchaseStatus, setpurchaseStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noofpages: "",
    imageurl: "",
    price: "",
    dprice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadedImages: []
  })

  //image icon click cheythal img upload aavum aa icon nu pakaram
  const [preview, setPreview] = useState("")
  //recent photo image icon nte baagath kaanikya. baaki okke thazhe thazhe
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")
  const [profile, setProfile] = useState("")
  const [userBooks, setUserBooks] = useState([])
  const [userBroughtBooks, setUserBroughtBooks] = useState([])
  const [deleteStatus, setDeleteStatus] = useState("")


  const { userProfileStatus } = useContext(userProfileUpdateContext)



  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadedImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadedImages: fileArray })


    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setPreview(url)

    const newArray = previewList
    newArray.push(url)
    setPreviewList(newArray)

  }

  //reset btn click cheythal ellam clear aavum
  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadedImages: []
    })
    setPreview("")
    setPreviewList([])
  }

  const handleSubmit = async () => {
    const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadedImages } = bookDetails

    if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || uploadedImages.length === 0) {
      toast.warning("please fill the fields")
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadedImages.forEach((item) => {
            reqBody.append("uploadedImages", item)
          })
        }
      }
      const result = await addBookAPI(reqBody, reqHeader)
      console.log(result);

      if (result.status == 401) {
        toast.warning(result.response.data)
        handleReset()
      } else if (result.status == 200) {
        toast.success("Book added successfully")
        handleReset()
      } else {
        toast.error("something went wrong")
        handleReset()
      }

    }
  }

  const getAllUserBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBooksAPI(reqHeader)
    //console.log(result);
    if (result.status == 200) {
      setUserBooks(result.data)
    }

  }

  const getAllUserBroughtBooks = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserBroughtBooksAPI(reqHeader)
    //console.log(result);
    if (result.status == 200) {
      setUserBroughtBooks(result.data)
    }

  }

  const deleteBook =async(id)=>{
    const result = await deleteAUserBookAPI(id)
    console.log(result);
    toast.success(result.data)
    if(result.status==200){
          setDeleteStatus(result.data)
        }
  }



  //page load aavumbo token get cheyyanam. so useEffect
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const userDetail =JSON.parse(sessionStorage.getItem("existingUser"))
      setProfile(userDetail.profile)

    }
  },[userProfileStatus])

  useEffect(() => {
    if (userBookStatus == true) {
      getAllUserBooks()
    }else if (purchaseStatus == true) {
      getAllUserBroughtBooks()
    } else {
      console.log("something went wrong");
    }
  },[userBookStatus, purchaseStatus,deleteStatus])



  return (
    <>
      <Header />



      <div style={{ height: '200px' }} className='bg-gray-900' ></div>
      <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-150px' }} className='bg-white p-3'>
        <img
          src={profile == "" ?
            "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            : profile.startsWith("https://1h3.googleusercontent.com") ? profile
              : `${serverURL}/upload/${profile}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
      </div>
      <div className='flex justify-between px-20 mt-5'>
        <p className='flex justify-center items-center'>
          <span className='text-3xl'>VasundharaG</span>
          <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3' />
        </p>
        <EditProfile />
      </div>
      <p className='md:px-20 my-4 text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis quam, officiis, labore eveniet nemo veritatis rem facilis, dolore tenetur aliquid libero eum aliquam quis consequuntur mollitia! Perferendis quidem numquam optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quasi optio, rem sapiente voluptatum ab rerum minima culpa non dignissimos. Vero a aliquam unde voluptatibus perspiciatis quis labore cupiditate voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque architecto repellat eius quam accusantium possimus at tempora id nemo, placeat quibusdam officiis nostrum a quas, iste cum quos. Accusamus, distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod tenetur cumque praesentium itaque! Ipsum nemo facilis vel sequi quam? Beatae culpa nesciunt maxime ullam laudantium veniam harum corporis, rerum enim!lo Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sint perspiciatis unde illo est quod dolorum eligendi nemo dolore quisquam ratione, debitis quo reprehenderit adipisci placeat, quasi ea consectetur consequatur.

      </p>

      {/* tabs */}
      <div className='md:px-40'>
        <div className='flex justify-center items-center my-5'>
          <p onClick={() => { setsellStatus(true); setuserBookStatus(false); setpurchaseStatus(false) }} className={sellStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : userBookStatus ? 'p-4 border-b text-black border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 '}>Sell Books</p>

          <p onClick={() => { setsellStatus(false); setuserBookStatus(true); setpurchaseStatus(false) }} className={userBookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : sellStatus ? 'p-4 border-b text-black border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 '}>Book Status</p>

          <p onClick={() => { setsellStatus(false); setuserBookStatus(false); setpurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : sellStatus ? 'p-4 border-b text-black border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 '}>Purchase History</p>
        </div>
      </div>


      {/* content */}
      {/* sellstatus true aanel div display cheyyanam....athanu meaning */}

      {sellStatus &&
        <div className='bg-gray-200 p-10 m-20'>
          <h1 className='text-center text-3xl font-medium'>Book Details</h1>
          <div className='md:grid grid-cols-2 mt-5 w-full'>
            <div className='px-3'>
              <div className='mb-3'>
                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} type="text" placeholder='No Of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.imageurl} onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} type="text" placeholder='image URL' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} type="text" placeholder='dPrice' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} rows={5} placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>


              {/* i/p next section */}
            </div>
            <div className='px-3'>
              <div className='mb-3'>
                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>
              <div className='mb-3'>
                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
              </div>

              <div className='mb-3 flex justify-center items-center w-full mt-10'>
                {!preview ? <label htmlFor="imageFile">
                  <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7HhyqJROfFo776omzUDCF6WW1AgpcgoizQ&s" alt="no img" style={{ width: '200px', height: '200px' }} />
                </label> :
                  <img src={preview} alt="no img" style={{ width: '200px', height: '200px' }} />
                }
              </div>


              {/* image button */}
              {preview &&
                <div className='flex justify-center items-center'>
                  {previewList?.map((item) => (
                    <img src={item} alt="no img" style={{ width: '70px', height: '70px', marginRight: '5px' }} />
                  ))
                  }
                  {previewList.length < 3 &&
                    <label htmlFor="imageFile">
                      <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                      <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-2' />
                    </label>}
                </div>}
            </div>
          </div>


          {/* button */}
          <div className='flex justify-end'>
            <button onClick={handleReset} className='bg-amber-600 rounded text-black p-3 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600 me-2'>Reset</button>
            <button onClick={handleSubmit} className='bg-green-600 rounded text-black p-3 hover:bg-white hover:border hover:border-green-600 hover:text-green-600'>Submit</button>
          </div>
        </div>
      }

      {userBookStatus &&
        <div className='p-10 m-20 shadow rounded'>
          {userBooks?.length > 0 ?
            userBooks?.map((item) => (
              <div className='bg-gray-200 p-5 rounded m-2'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className=''>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>{item.author}</h2>
                    <h3 className='text-blue-600'>$ {item?.price}</h3>
                    <p>Abstract : {item?.abstract}</p>

                    <div className='flex gap-4'>
                      {item.status == "pending" ?
                        <img src="https://t3.ftcdn.net/jpg/06/16/17/82/360_F_616178231_EjCK2QBHCUnt6VRqUXPaZp5KdPkY6Epi.jpg" alt="Pending..." style={{ width: '70px', height: '70px' }} />
                        : item.status == "approved" ?
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynFkJkVIeyEP4m2X8kiEs_-9HAebnxNozsw&s" alt="sold..." style={{ width: '70px', height: '70px' }} />
                          :
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmY84lanOs7QgDlQt6iZiJBRXM-Mo8iElQqA&s" alt="Approved..." style={{ width: '70px', height: '70px' }} />}
                    </div>
                  </div>

                  <div>
                    <img className='w-full' src={item?.imageurl} alt="Meluha" style={{ width: '200px', height: '300px' }} />
                    <div className='flex justify-end mt-4'>
                      <button onClick={()=>deleteBook(item?._id)} className='p-2 rounded bg-red-700 text-white hover:bg-gray-200 hover:text-red-700 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>

                </div>
              </div>

            ))


            :

            //{/* no books condition */}
            <div className='flex justify-center items-center flex-col'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7Wjmv7bNhGcWC74ILUwuOQbdVsntGIpHfw&s" alt="no books" style={{ width: '200px', height: '200px' }} />
              <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
            </div>}
        </div>
      }

      {purchaseStatus &&
        <div className='p-10 m-20 shadow rounded'>
          {userBroughtBooks?.length > 0 ?
            userBroughtBooks?.map((item) => (
              <div className='bg-gray-200 p-5 rounded m-2'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className=''>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>{item?.author}</h2>
                    <h3 className='text-blue-600'>$ {item?.price}</h3>
                    <p>Abstract : {item?.abstract}</p>
                  </div>

                  <div>
                    <img className='w-full' src={item?.imageurl} alt="Meluha" style={{ width: '200px', height: '300px' }} />
                    <div className='flex justify-end mt-4'>
                      <button className='p-2 rounded bg-red-700 text-white hover:bg-gray-200 hover:text-red-700 hover:border hover:border-red-600'>Delete</button>
                    </div>
                  </div>

                </div>
              </div>
            ))

            :
            //{/* no books condition */}
            <div className='flex justify-center items-center flex-col'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7Wjmv7bNhGcWC74ILUwuOQbdVsntGIpHfw&s" alt="no books" style={{ width: '200px', height: '200px' }} />
              <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
            </div>}



        </div>
      }

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />


      <Footer />

    </>
  )
}

export default Profile
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { faBackward, faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../components/Footer'
import { Link, useParams } from 'react-router-dom'
import { makepPaymentAPI, viewABookApi } from '../../services/allApi'
import { serverURL } from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js'
import { toast, ToastContainer } from 'react-toastify'

function Viewbook() {
  const [modalStatus, setModalStatus] = useState(false)
  const [viewBookDetails, setViewBookDetails] = useState({})
  const [token, setToken] = useState("")
  


  const {id} = useParams()
  //console.log(id);

  const viewABook = async(id)=>{
    const result = await viewABookApi(id)
    //console.log(result);
    if(result.status ==200){
      setViewBookDetails(result.data)
    }
    
  }
  console.log(viewBookDetails);
  
  //payment
  const makePayment = async()=>{
    console.log(viewBookDetails);
    const stripe = await loadStripe('pk_test_51SfDnVHxyahl41KQxS1InYKaojMTexygjcYXHqSvYsKy4htTR10JQZC9LACq2sDMHFaE3QONcR6pEU8WljmtynE6004Nade9Fg');
    const reqBody ={
      bookDetails:viewBookDetails
    }
    
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await makepPaymentAPI(reqBody,reqHeader)
    console.log(result);
    

    const checkOutURL = result?.data?.url
    if(checkOutURL){
      //just redirect to the page
      window.location.href = checkOutURL
    }else{
      toast.error("something went wrong")
    }
  }




  useEffect(()=>{
    viewABook(id)
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  },[])
  

  return (
    <>
      <Header />
      <div className='md:p-20 p-5'>
        <div className='md:p-10 p-5 shadow w-full'>
          <div className='flex justify-end mb-5 md:mb-0'>
            <FontAwesomeIcon icon={faEye} className='text-gray-500' onClick={() => setModalStatus(true)} />
          </div>
          <div className='md:grid grid-cols-[1fr_3fr] w-full overflow-x-hidden'>
            <div>
              <img src={viewBookDetails?.imageurl} alt="no img" style={{ width: '100%', height: '400px' }} />
            </div>
            <div className='px-4 mt-5 md:mt-0'>
              <h1 className='text-center font-medium text-2xl'>{viewBookDetails?.title}</h1>
              <p className='text-blue-500 text-center mt-3 md:mt-0'>{viewBookDetails?.author}</p>

              <div className='md:flex justify-between mt-10'>
                <p>Publisher : {viewBookDetails?.publisher}</p>
                <p className='mt-3 md:mt-0'>Language : {viewBookDetails?.language}</p>
                <p className='mt-3 md:mt-0'>No. of pages : {viewBookDetails?.noofpages}</p>
              </div>

              <div className='md:flex justify-between mt-3'>
                <p>Seller Mail : {viewBookDetails?.userMail}</p>
                <p className='mt-3 md:mt-0'>Real price : {viewBookDetails?.price}</p>
                <p className='mt-3 md:mt-0'>ISBN : {viewBookDetails?.isbn}</p>
              </div>
              <p className='text-justify mt-10'>abstract:{viewBookDetails?.abstract}</p>
              <div className='mt-10 flex justify-end'>
                <Link to={'/all-books'}> <button className='px-4 py-3 bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border-blue-800'> <FontAwesomeIcon className='me-2' icon={faBackward} /> Back</button></Link>

                <button onClick={makePayment} type='button' className='ms-3 px-4 py-3 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border-gren-800'>Buy ${viewBookDetails?.noofpages}dprice</button>

              </div>
            </div>
          </div>
        </div>


        {modalStatus && <div onClick={() => setModalStatus(false)} className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-gray-500/75 transition-opacity' aria-hidden='true'></div>

          <div className='fixed insert-0 z-10 w-screen overflow-y-auto'>
            <div className='flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>

              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl'>
                <div className='bg-gray-900 p-3 text-white flex justify-between'>
                  <h3>Book Photos</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} />
                </div>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <p className='text-blue-500'><FontAwesomeIcon icon={faCamera} className='me-3' />Camera Click of the book in the hand of seller</p>

                  <div className='md:flex my-4'>
                    {viewBookDetails?.uploadedimg.map((item)=>(
                      <img className='mt-4 mx-5' src={`${serverURL}/upload/${item}`} style={{ width: '300px', height: '300px' }}  alt="no image" />
                    ))
                      }

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>}
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />

    </>
  )
}

export default Viewbook
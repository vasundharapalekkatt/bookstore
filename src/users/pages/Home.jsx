import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'
import { toast, ToastContainer } from 'react-toastify'

const Home = () => {

  const [homeBook,setHomeBook] = useState([])
  const {searchKey,setSearchKey} = useContext(searchKeyContext)
  const navigate = useNavigate()
  

  const getHomeBooks = async()=>{
    const result = await getHomeBooksAPI()
    console.log(result.data);
    if(result.status == 200){
      setHomeBook(result.data)
    }
  }

  const searchBook =()=>{
    //console.log("inside...");
    const token = sessionStorage.getItem("token")
    if(searchKey == ""){
      toast.info("Please enter the title of any book")
    }else if(!token){
      toast.info("please login")
      setTimeout(()=>{
        navigate("/login")
      },2500)
    }else if(searchKey && token){
      navigate("/all-books")
    }else{
      toast.error("something went wrong...")
    }

    
  }

useEffect(()=>{
  setSearchKey("")
  getHomeBooks()
},[])

  return (
    <>
      <Header />
      <header className='flex justify-center items-center'>
        <div id='main' className='flex justify-center items-center w-full'>
          <div className='md:grid grid-cols-3 w-full'>
            <div></div>
            <div className='text-white flex justify-center items-center flex-col'>
              <h1 className='text-5xl'>Wonderful Gifts</h1>
              <p>Give Your Family and Friends a Book</p>

              <div className='flex mt-10 w-full'>
                <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search Books Title' className='p-2 bg-white rounded-xl placeholder-gray-500 w-full text-black' />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-800' style={{ marginTop: '6px', marginLeft: '-20px' }} onClick={searchBook}/>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/*New Arrivals */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>NEW ARRIVALS</h2>
        <h4>Explore Our Latest Collection</h4>

        <div className='md:grid grid-cols-4 w-full mt-5'>
          { homeBook?.length >0 ?
             homeBook?.map((item)=>(
            <div className='p-3'>
            <img src={item?.imageurl} alt="NoImage" style={{ width: '100%', height: '300px' }} />
            <div className='flex justify-center flex-col items-center mt-3'>
              <p>{item?.author}</p>
              <h3>{item?.title}</h3>
              <p>{item?.dprice}</p>
            </div>
          </div>

          ))
          
          :
          <p>Loading....</p> }

        </div>

        <div className='flex justify-center items-center my-5'>
          <Link to={'/all-books'}><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
        </div>




      </section>

      {/*Author */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2 w-full'>
          <div>
            <div className='flex justify-center items-center flex-col'>
              <h4>Featured Authors</h4>
              <h3 className='text-2xl'>Captivates With Every Word</h3>
            </div>
            <p className='mt-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sunt ut maxime inventore omnis soluta fugit, praesentium nobis error vero aliquid tenetur explicabo numquam assumenda saepe minus quos eos dolores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni distinctio dolores sequi unde assumenda quo, voluptate nisi officiis nobis? Accusantium adipisci tempora odio nam animi laboriosam quibusdam quia similique repellat!</p>

            <p className='mt-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sunt ut maxime inventore omnis soluta fugit, praesentium nobis error vero aliquid tenetur explicabo numquam assumenda saepe minus quos eos dolores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni distinctio dolores sequi unde assumenda quo, voluptate nisi officiis nobis? Accusantium adipisci tempora odio nam animi laboriosam quibusdam quia similique repellat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorum hic aliquid assumenda sed voluptatibus eius quaerat quos corrupti laboriosam voluptatum laudantium corporis veniam libero iure nobis, nihil veritatis vel? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque odit ducimus. Mollitia reiciendis repellendus laudantium aliquam maxime consequuntur officiis eos possimus molestias, ex voluptas voluptatem aliquid dicta recusandae consectetur?</p>
          </div>
          <div className='px-10 pt-8'>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg" alt="no" className='w-full'/>
          </div>

        </div>

      </section>

      {/*Testimonials */}
      <section >
        <div className='flex justify-center items-center flex-col md:py-10 px-40 '>
          <h3>TESTIMONIALS</h3>
          <h3 className='text-2xl'>See What Others Are Saying</h3>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnfgoz25lXKEIM3jFMW92MEtTBszhp_y7iQA&s" alt="no" style={{width:'150px',height:'150px', borderRadius:'50%'}} className='mt-5'/>
          <h6 className='mt-3'>Ragini</h6>
          <p className='mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium consequatur sunt porro corrupti necessitatibus, unde quisquam quibusdam nulla beatae fugiat molestiae nostrum quidem accusantium fugit non debitis, cumque molestias. Maxime.</p>
        </div>
      </section>

            <ToastContainer theme='colored' position='top-center' autoClose={2000} />


      <Footer />
    </>
  )
}

export default Home
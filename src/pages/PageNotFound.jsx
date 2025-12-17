import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        /*  <div className='grid grid-cols justify-center items-center'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7Hmnx49Ly8afYo1V-VK27xaU-BJ6_3gu0hOUqjCTihDE6Rpqa9x6uVgie5ucw5RV_mM&usqp=CAU" alt="404 ERROR" />
          </div> */ //or 

        <div className='w-full h-screen flex justify-center items-center'>
            <div className='md:grid grid-cols-3'>
                <div></div>
                <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                    <img src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-gif-download-3299960.gif" alt="404 ERROR" />
                    <p>Oh No!!</p>
                    <h1 className='md:text-5xl text-2xl'>Looks Like You're Lost</h1>
                    <h5>The Page you are looking for is not available</h5>
                    <Link to={'/'}><button className='mt-4 px-4 py-3 bg-blue-950 text-white rounded hover:border hover:border-blue-400 hover:bg-white hover:text-blue-600'>Back Home</button> </Link>

                </div>
                <div></div>
            </div>

        </div>
    )
}

export default PageNotFound
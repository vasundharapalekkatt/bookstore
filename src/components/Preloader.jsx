import React from 'react'

const Preloader = () => {
  return (
  

    <div className='w-full h-screen flex justify-center items-center'>
            <div className='md:grid grid-cols-3'>
                <div></div>
                <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                     <img src="https://i.pinimg.com/originals/84/b7/e1/84b7e12a32dcd7c7e842bb214e70e11c.gif" alt="" />

                </div>
                <div></div>
            </div>

        </div>
  )
}

export default Preloader
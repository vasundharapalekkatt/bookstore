import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* --- News Section --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">ABOUT US</h2>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio in facilis, assumenda rerum expedita corporis reiciendis nemo, neque tempore ipsum, minus quasi. Consectetur, dolorum odio aspernatur incidunt voluptatum magnam nesciunt?
          </p>
        </div>

        {/* --- About Section --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">NEWS LETTER</h2>
          <p className="text-gray-400 text-sm">
            BookStore is your go-to destination for discovering and enjoying books from all genres.
            <div className='mt-2'>
              <input type="text" placeholder='Email ID' className='w-50 mb-3 p-2 border rounded focus:outline-none focus:ring-gray-400 bg-white text-black placeholder-black' />
              <button className='w-10 mb-3 p-2 border rounded bg-amber-300'><FontAwesomeIcon icon={faArrowRight} className='text-black'/></button>
            </div>
            
          </p>
        </div>

        {/* --- Contact Section --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">FOLLOW US</h2>
          <p className="text-gray-400 text-sm">
             Let us be social
             <div className='mt-2'>
              <FontAwesomeIcon icon={faInstagram} className='me-2'/>
              <FontAwesomeIcon icon={faXTwitter} className='me-2'/>
              <FontAwesomeIcon icon={faFacebook} className='me-2'/>
              <FontAwesomeIcon icon={faLinkedin} />
             </div>
          </p>
        </div>
      </div>

      {/* --- Footer Bottom Line --- */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © 2025 BookStore. All rights reserved.
      </div>
    </footer>

    </>
  )
}

export default Footer
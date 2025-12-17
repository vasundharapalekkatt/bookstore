import { faEnvelope, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const Conta = () => {
    return (
        <>
            <Header />
            <section className='text-center'>

                <h1 className='text-5xl  mb-4'>Contacts</h1>
                <p className='text-gray-600 max-w-4xl mx-auto mb-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem commodi quos, saepe amet quo necessitatibus eos suscipit nobis nemo libero deserunt atque fugiat, aut blanditiis excepturi minima optio aperiam quis!</p>


                <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-12'>
                    <div className='flex items-center space-x-3'>
                        <FontAwesomeIcon icon={faLocationDot} className='text-gray-600' />
                        <p>ABC street,132 line ,Anytown, CA 1235</p>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <FontAwesomeIcon icon={faPhone} className='text-gray-600' />
                        <p>+91 7467245637</p>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-gray-600' />
                        <p>hfghghjsvb@gmail.com</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <form className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Send Me Message</h2>
                        <input type="text"
                            placeholder='Enter Name'
                            className='w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />

                        <input type="email"
                            placeholder='Enter Email ID'
                            className='w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />

                        <textarea
                            placeholder='Message'
                            className='w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
                        >
                            Send <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                        </button>
                    </form>

                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.664793236295!2d76.32567807459691!3d9.981635490133733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d57b9c2b0e9%3A0x30e4a2a09dbb5b09!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1696426879615!5m2!1sen!2sin"
                        className="w-full max-w-md h-82 border-0 rounded-lg"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default Conta
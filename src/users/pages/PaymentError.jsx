import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PaymentError = () => {
    return (
        <>
            <Header />
            <div className='container my-10'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
                    <div>
                        <h1 className='md:text-4xl text-blue-800'>Sorry Your Payment Unsuccessful</h1>
                        <p className='my-4 text-2xl'>
                            We apologize for the inconvinience caused
                        </p>
                        <Link to={'/all-books'}>
                            <button className='bg-blue-800 px--4 py-3 text-white my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800 rounded'>
                                <FontAwesomeIcon icon={faBackward} className='me-2'/>
                                Explore more books
                            </button>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="no image" className='w-full' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError
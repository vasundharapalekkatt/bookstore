import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'

const Caree = () => {
  const [showModal, setshowModal] = useState(false)

  return (

    <>
      <Header />
      {/* --- Careers Section --- */}

      <section className="text-center py-12 px-6">
        <h2 className="text-2xl font-semibold mb-4">Careers</h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione,
          officia delectus consequuntur, dicta libero magni omnis architecto
          voluptas culpa praesentium ipsum assumenda quae dolor, nihil rerum
          fugit expedita corrupti. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Optio maiores fuga, modi vel accusantium magnam ex,
          ratione aliquam eius odit consequuntur earum, itaque nulla labore
          veritatis quis aut atque!
        </p>

        {/* --- Current Openings --- */}
        <div className="max-w-4xl mx-auto text-left">
          <h3 className="text-lg font-medium mb-4">Current Openings</h3>

          {/* Search Bar */}
          <div className="flex mb-8 ">
            <input
              type="text"
              placeholder="Job Title"
              className="p-2 border border-gray-300 rounded-l focus:outline-none"
            />
            <button className="bg-green-600 text-white px-4 rounded-r hover:bg-green-700 transition">
              Search
            </button>
          </div>

          {/* --- Job Card --- */}
          <div className="border border-gray-300 rounded-md shadow-sm p-6 relative bg-white">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold mb-2">Job Title</h4>
              <button onClick={() => setshowModal(true)} className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-1 hover:bg-blue-700 transition">
                Apply <FontAwesomeIcon icon={faLocationDot} size={14} />
              </button>
            </div>

            <hr className="my-3" />

            {/* Job Details */}
            <div className="space-y-1 text-gray-700">
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} />Location
              </p>
              <p>Job Type: Senior Level</p>
              <p>Salary: 10 lakhs</p>
              <p>Qualification: M-Tech / B-Tech / BCA / MCA</p>
              <p>Experience: 5 - 7 years</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Description: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </section>

      {/*Modal*/}
      {showModal && (

        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">

            {/*Modal Header*/}
            <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
              <h3 className='text-3xl text-black'>Application Form</h3>
              <button onClick={() => setshowModal(false)} className='text-gray-600 hover:text-gray-900 text-2xl'>&times; </button>
            </div>

            {/*form*/}
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Qualification"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email ID"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="border p-2 rounded w-full"
                />
              </div>
              <textarea
                rows="3"
                placeholder="Cover Letter"
                className="border p-2 rounded w-full"
              ></textarea>

              <div>
                <label className="block text-gray-600 mb-1">Resume</label>
                <input type="file" className="border p-2 rounded w-full" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="reset"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>

            </form>

          </div>
        </div>
      )}


      <Footer />

    </>
  )
}

export default Caree
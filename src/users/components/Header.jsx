import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import { userProfileUpdateContext } from '../../context/Contextshare'

const Header = () => {

  const [status, setStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token,setToken] = useState("")
  const [profile,setProfile] = useState("")

  const {userProfileStatus} = useContext(userProfileUpdateContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
       setProfile(user.profile)
    }
  },[userProfileStatus])
  
  console.log(token);
  
  return (
    <>
      <div className='md:grid grid-cols-3 p-3'>
        <div className='flex items-center'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ziDXK-b7xHnTkx073j4K8rttEQQqbGueEg&s" alt="logo" style={{ width: '50px', height: '50px' }} />

          <h1 className='text-2xl md:hidden ms-2'>BOOKSTORE</h1>

        </div>
        <div className='md:flex justify-center items-center'>
          <h1 className='text-3xl'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faXTwitter} className='me-3' />
          <FontAwesomeIcon icon={faFacebookF} className='me-3' />

          {!token ? <Link to={'/login'} >
            <button className='border border-black rounded px-3 py-2'><FontAwesomeIcon icon={faUser} className='me-2' /> LogIn</button></Link>
            :

          //{/*dropdown */}

          <div className='relative inline-block text-left'>
            <div>
              <button
                type='button'
                className='inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50'
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
                onClick={() => setDropDownStatus(!dropDownStatus)}>

                <img src={ profile == "" ? 
                        "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" 
                        : profile.startsWith("https://lh3.googleusercontent.com") ? profile 
                        : `${serverURL}/upload/${profile}`} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

              </button>
            </div>
            {dropDownStatus && <div
              className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
              tabIndex="-1">

              <div className='py-1' role='none'>
                <Link to={'/profile'}>
                  <p
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex="-1"
                    id='menu-item-0'>
                    <FontAwesomeIcon icon={faAddressCard} className='me-2' />{" "}
                    Profile

                  </p>

                </Link>
                <Link to={'/login'}>
                  <button
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex="-1"
                    id='menu-item-1'>
                    <FontAwesomeIcon icon={faPowerOff} className='me-2' />
                    Log Out
  
                  </button>
                </Link>

              </div>

            </div>}

          </div>
          }

        </div>

      </div>

      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center items-center'>
        <div className='flex justify-between px-3 md:hidden'>
          <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>
          
            {!token ? <Link to={'./login'} >
              <button className='border border-black rounded px-3 py-2'><FontAwesomeIcon icon={faUser} /> LogIn</button></Link>
              :

          //{/*dropdown */}

          <div className='relative inline-block text-left'>
            <div>
              <button
                type='button'
                className='inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50'
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
                onClick={() => setDropDownStatus(!dropDownStatus)}>

                <img src={ profile == "" ? 
                        "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" 
                        : profile.startsWith("https://lh3.googleusercontent.com") ? profile 
                        : `${serverURL}/upload/${profile}`} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />

              </button>
            </div>
            {dropDownStatus && <div
              className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
              tabIndex="-1">

              <div className='py-1' role='none'>
                <Link to={'/profile'}>
                  <p
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex="-1"
                    id='menu-item-0'>
                    <FontAwesomeIcon icon={faAddressCard} className='me-2' />{" "}
                    Profile

                  </p>

                </Link>
                <Link to={'/login'}>
                  <button
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex="-1"
                    id='menu-item-1'>
                    <FontAwesomeIcon icon={faPowerOff} className='me-2' />
                    Log Out
  
                  </button>
                </Link>

              </div>

            </div>}

          </div>}

        </div>




        <ul className={status ? "md:flex" : "md:flex justify-center hidden"} >
          <Link to={'/'}><li className='mx-4 mt-3 md:mt-0'>Home</li></Link>
          <Link to={'/all-books'}><li className='mx-4'>Books</li></Link>
          {/*<Link to={'/caree'}><li className='mx-4'>Careers</li></Link>*/}
          <Link to={'/conta'}><li className='mx-4'>Contacts</li></Link>
        </ul>
      </nav>



    </>
  )
}

export default Header
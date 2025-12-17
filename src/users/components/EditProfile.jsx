import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../../services/serverURL'
import { toast, ToastContainer } from 'react-toastify'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { userProfileUpdateAPI } from '../../services/allApi'

const EditProfile = () => {

  const {setUserProfileStatus} = useContext(userProfileUpdateContext)

  const [offCanvasStatus,setOffCanvasStatus] = useState(false)

  const [userDetails,setUserDetails] = useState({
    username:"",
    password:"",
    cPassword:"",
    profile:"",
    bio:""
  })

  const [preview,setPreview] = useState("")
  const [token,setToken] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})


    //change profile picture
    const handleFileAdd = (e) => {
      const event = e.target.files[0]
      setUserDetails({ ...userDetails, profile: event })
      console.log(userDetails.profile);

      if (event !="") {
        const url = URL.createObjectURL(event)
        setPreview(url)
      }
    }


  //reset
    const handleReset = () => {
      if (sessionStorage.getItem("token")) {
        //const token = sessionStorage.getItem("token")
        //setToken(token)
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserDetails({username:user.username,password:user.password,cPassword:user.password,bio:user.bio})
        setExistingImg(user.profile)
      }
      setPreview("")
    }

  //update
    const handleUpdate = async()=>{
      //destructure these 4 details from adminDetails . ellam fill aano enn ariyan
      const {username,password,cPassword,profile,bio} = userDetails
      console.log(username,password,cPassword,profile,bio);
  
      if (!username || !password || !cPassword || !bio) {
        toast.info("please enter details")
      } else {
  
        if (password!=cPassword) {
          toast.warning("password must match")
        } else {
          if(preview) {
            const reqHeader ={
              "Authorization": `Bearer ${token}`
            }
  
            const reqBody = new FormData()
            for (let key in userDetails) {
              reqBody.append(key,userDetails[key])
            }
            const result = await userProfileUpdateAPI(reqBody,reqHeader)
            console.log(result);
            if (result.status == 200) {
              toast.success("profile updated")
              sessionStorage.setItem("existingUser",JSON.stringify(result.data))              
              setUpdateStatus(result.data)
              setOffCanvasStatus(false)
              setUserProfileStatus(result.data)
            } else {
              toast.error("something went wrong")
              handleReset()
              setUpdateStatus({})
            }
  
          }
          else{
            const reqHeader ={
              "Authorization": `Bearer ${token}`
            }
            const result = await userProfileUpdateAPI({ username, password, profile: existingImg },reqHeader)
            console.log(result);
            if (result.status == 200) {
              toast.success("profile updated")
              sessionStorage.setItem("existingUser", JSON.stringify(result.data))
              setOffCanvasStatus(false)
              setUpdateStatus(result.data)
              setUserProfileStatus(result.data)
            } else {
              toast.error("something went wrong")
              handleReset()
              setUpdateStatus({})
            }
  
  
          }
        }
  
      }
    }


    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        setToken(token)
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserDetails({ username:user.username,password:user.password,cPassword:user.password,bio:user.bio})
        setExistingImg(user.profile)
      }
    },[updateStatus])



  return (
    <div className='flex justify-end mt-5 md:mt-0'>
        <button 
        onClick={()=> setOffCanvasStatus(true)}
        className='bg-blue-600 border-blue-600  p-3 rounded hover:bg-blue-700 hover:text-white'
        >{" "}
        <FontAwesomeIcon icon={faPenToSquare} />
            Edit    
        </button>

        {offCanvasStatus && (
          <div>
            <div 
            className='fixed insert-0 bg-gray-500/75 transition-opacity' 
            aria-hiddent='true'>
            </div>

            <div className='bg-white h-full w-90 fixed z-50 top-0 left-0'>
              <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                <h1>Edit User Profile</h1>
                <FontAwesomeIcon onClick={()=> setOffCanvasStatus(false)} icon={faXmark} />
              </div>

              <div className='flex justify-center items-center flex-col'>
                <label htmlFor="profilefile">
                  <input onChange={(e) => handleFileAdd(e)} type="file" id='profilefile' style={{display:"none"}} />

                  {existingImg == "" ? 
                  <img src={preview? preview :"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} style={{width:"100px",height:"100px"}} />

                : existingImg.startsWith("https://1h3.googleusercontent.com") ?

                <img src={preview? preview :existingImg}
                style={{width:"100px",height:"100px"}} />

                :
                <img src={preview? preview :`${serverURL}/upload/${existingImg}`}
                style={{width:"100px",height:"100px"}} />

                }

                  

                  <div className='bg-yellow-300 z-53 text-white p-4 rounded 'style={{marginLeft:"145px",marginTop:"-50px"}}>
                     <FontAwesomeIcon  icon={faPen} />
                  </div>
                </label>

                <div className='mb-3 mt-5 w-full px-5'>
                  <input value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='UserName' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded mt-10' />
                </div>

                <div className='mb-3 mt-5 w-full px-5'>
                  <input value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                </div>

                <div className='mb-3 mt-5 w-full px-5'>
                  <input value={userDetails.cPassword} onChange={(e)=>setUserDetails({...userDetails,cPassword:e.target.value})} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded' />
                </div>

                <div className='mb-3 mt-5 w-full px-5'>
                  <textarea value={userDetails.bio} onChange={(e)=>setUserDetails({...userDetails,bio:e.target.value})} placeholder='Bio' rows={5} className='w-full border border-gray-300 placeholder-gray-900 p-2 rounded'></textarea>
                </div>

                <div className='flex'>
                  <button onClick={handleReset} className='bg-amber-600 text-black p-3 rounded hover:bg-white hover:hover hover: border-amber-600 hover:text-amber-600'>
                  Reset
                  </button>
                  <button onClick={handleUpdate} className='bg-green-600 text-white p-3 rounded hover:bg-white hover:hover hover: border-green-600 hover:text-green-600'>
                  Submit
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
        
        <ToastContainer theme='colored' position='top-center' autoClose={200} />


    </div>
  )
}

export default EditProfile
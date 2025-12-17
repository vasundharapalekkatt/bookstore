import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { googleloginAPI, loginAPI, registerAPI } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'


const Auth = ({register}) => {

  const [userDetails,setuserDetails] = useState({
    username:"",
    email:"",
    password:""
  })

  
  const navigate = useNavigate()
  console.log(userDetails);

  const handleRegister = async()=>{
    const {username,email,password}= userDetails
    if(!username || !email || !password){
      toast.info("please fill the form completely")
    }else{
      //api call
      const result = await registerAPI({username,email,password})
      console.log(result);
      if(result.status == 200){
        toast.success("Registration successful")
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate("/login")
      }else if(result.status == 400){
        toast.warning(result.response.data)
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
      }else{
        toast.error("something went wrong")
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }

  const handleLogin = async()=>{
    const {email,password} = userDetails    
    if(!email || !password){
      toast.info("Please fill the form")
    }else{
      //api call
      const result = await loginAPI({email,password})
      console.log(result);

      if(result.status == 200){
        toast.success("Login Successful")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setTimeout(()=>{
          if(result.data.existingUser.email == "bookAdmin@gmail.com"){
          navigate("/admin-home")
        }else{
          navigate("/")
        }  
        },5000) 
      }
      
      //so api call allapi il create cheyya
    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleloginAPI({username:details.name,email:details.email,password:"googlePswd",photo:details.picture})
    console.log(result);
    
    if(result.status == 200){
      toast.success("Login successful")
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)

      setTimeout(()=>{
        if(result.data.existingUser.email == "bookAdmin@gmail.com"){
          navigate("/admin-home")
        }else{
          navigate("/")
        }
      },2500)
    }
    else{
      toast.error("something went wrong")
    }
  }
  

  return (
    <div id='loginPage'>

      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-3xl text-black m-5 font-bold'>BOOKSTORE</h1>

          <form className='w-full bg-gray-900 p-10 flex justify-center items-center flex-col'>
            <div style={{width:'70px',height:'70px',borderRadius:'50%' }} className='border border-white flex justify-center items-center'>
              <FontAwesomeIcon icon={faUser} className='text-white fa-2x'/>
            </div>

            {!register ? <h1 className='text-white mt-4 text-3xl'>LogIn</h1>
            :
            <h1 className='text-white mt-4 text-3xl'>Register</h1>}
             {register && <div className='mb-3 w-full mt-8'> 
              <input value={userDetails.username} onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})} type="text" placeholder='User Name' className='p-2 rounded placeholder-gray-600 bg-white w-full'/>
            </div>}

            <div className='mb-3 w-full mt-8'> 
              <input value={userDetails.email} onChange={(e)=>setuserDetails({...userDetails,email:e.target.value})} type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full'/>

            </div>
            <div className='mb-3 w-full mt-8'> 
              <input value={userDetails.password} onChange={(e)=>setuserDetails({...userDetails,password:e.target.value})} type="text" placeholder='password' className='p-2 rounded placeholder-gray-600 bg-white w-full'/>
            </div>

            <div className='mb-5 w-full flex justify-between'>
              <p className='text-amber-400' style={{fontSize:'10px'}}>*Never Share Your Password With Others</p>
              {!register && <p className='text-white' style={{fontSize:'10px'}}>Forgot Password</p>}
            </div>

            {!register ? <div className='mb-2 w-full'>
              <button type='button' onClick={handleLogin} className='bg-green-700 text-white w-full p-3 rounded'>LogIN</button>
            </div>
            :
            <div className='mb-2 w-full'>
              <button type='button' onClick={handleRegister} className='bg-green-700 text-white w-full p-3 rounded'>Register</button>
            </div>}

           <p className='text-white'>...........................OR........................</p>
            
              {!register && <div className='mb-5 mt-3 w-full '>
                {/*<button className='bg-blue-800 text-white w-full p-3'><FontAwesomeIcon icon={faGoogle} className='me-2'/>Sign in with Google</button>*/}
                                <GoogleLogin width={'300px'}
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
                </div>}
              

              {!register ? <p className='text-white'>Are you a New User? <Link to={'/register'} >Register</Link></p>
              :
              <p className='text-white'>Existing User? <Link to={'/login'} >LogIN</Link></p>}

          </form>
        </div>
        <div></div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </div>
  )
}

export default Auth
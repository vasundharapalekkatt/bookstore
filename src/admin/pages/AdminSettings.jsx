import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { adminProfileUpdateAPI } from '../../services/allApi'
import { adminProfileUpdateContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const AdminSettings = () => {

  const { setAdminProfileStatus } = useContext(adminProfileUpdateContext)


  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})

  

  //change profile picture
  const handleFileAdd = (e) => {
    const event = e.target.files[0]
    setAdminDetails({ ...adminDetails, profile:event })
    console.log(adminDetails.profile);

    if (event != "") {
      const url = URL.createObjectURL(event)
      setPreview(url)
    }
  }
  console.log(preview);

  //reset
  const handleReset = () => {
    if (sessionStorage.getItem("token")) {
      //const token = sessionStorage.getItem("token")
      //setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({username:user.username, password:user.password,cPassword: user.password})
      setExistingImg(user.profile)
    }
    setPreview("")
  }

  //update
  const handleUpdate = async () => {
    //destructure these 4 details from adminDetails . ellam fill aano enn ariyan
    const {username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);

    if (!username || !password || !cPassword) {
      toast.info("please enter details")
    } else {

      if (password != cPassword) {
        toast.warning("password must match")
      } else {
        if (preview) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const reqBody = new FormData()
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const result = await adminProfileUpdateAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("profile updated")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileStatus(result.data)
          } else {
            toast.error("something went wrong")
            setUpdateStatus({})
          }

        } else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await adminProfileUpdateAPI({ username, password, profile: existingImg }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("profile updated")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileStatus(result.data)
          } else {
            toast.error("something went wrong")
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
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingImg(user.profile)
    }
  },[updateStatus])



  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-200'>
          <AdminSideBar />
        </div>
        <div className="w-full px-10 py-6">

          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-center mb-10">Settings</h1>

          {/* Main Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE CONTENT (Paragraphs) */}
            <div className="text-justify space-y-6 leading-relaxed text-xl text-gray-800">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime
                quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam.
                Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Sed neque, facilis?
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime
                quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam.
                Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet
                inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis,
                est blanditiis exercitationem velit excepturi?
              </p>
            </div>

            {/* RIGHT SIDE PROFILE SETTINGS BOX */}
            <div className="bg-[#cfe0ff] p-10 rounded-lg shadow-md flex flex-col items-center">

              <div className='md:px-5 mt-5 md:mt-0'>
                <form className='shadow rounded bg-blue-200 md:p-10 p-5 flex justify-center items-center flex-col'>
                  <label
                    htmlFor="AdminProfilefile"
                    style={{ marginBottom: "50px" }}>

                    <input
                      id='AdminProfilefile'
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileAdd(e)} />

                    {existingImg == "" ?
                      <img src={preview ? preview : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}

                        alt="no image"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                        }} />
                      :
                      <img src={preview ? preview : `${serverURL}/upload/${existingImg}`}

                        alt="no image"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                        }} />
                    }
                    <FontAwesomeIcon
                      icon={faPen}
                      className='bg-yellow-300 text-white py-3 px-4 rounded'
                      style={{ marginLeft: "90px", marginTop: "-100px" }} />
                  </label>
                </form>

              </div>
              {/* Form */}
              <div className="w-full space-y-4">

                <input
                  value={adminDetails.username}
                  onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded"
                />

                <input
                  value={adminDetails.password}
                  onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded"
                />

                <input
                  value={adminDetails.cPassword}
                  onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded"
                />

                {/* Buttons */}
                <div className="flex justify-between gap-4 pt-4">
                  <button
                    onClick={handleReset}
                    type='button'
                    className="w-1/2 bg-orange-600 text-white py-2 rounded">
                    Reset
                  </button>

                  <button
                    onClick={handleUpdate}
                    type='button'
                    className="w-1/2 bg-green-600 text-white py-2 rounded">
                    Update
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={200} />

      <Footer />
    </>
  )
}

export default AdminSettings
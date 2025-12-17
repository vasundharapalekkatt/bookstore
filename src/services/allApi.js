import {commonAPI} from './commonAPI'
import {serverURL} from './serverURL'

//register
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//Google login
export const googleloginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

//Get home books
export const getHomeBooksAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-books`)
}


//....................................user.....................................

export const addBookAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reqHeader)
}

//Get all books
export const getAllBooksAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-books?search=${searchKey}`,"",reqHeader)
}

//api to view a book
export const viewABookApi = async(id)=>{
    return await commonAPI("GET",`${serverURL}/view-books/${id}`)
}

//update user profile - /user-profile-update
export const userProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user-profile-update`,reqBody,reqHeader)
}

//Get all user books
export const getAllUserBooksAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-added-books`,"",reqHeader)
}

//Get all user brought books
export const getAllUserBroughtBooksAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-brought-books`,"",reqHeader)
}

//delete a user book
export const deleteAUserBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-user-book/${id}`)
}

//to make payment
export const makepPaymentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/make-payment`,reqBody,reqHeader)
}



//...................................ADMIN........................................

//Get all books - all admin books
export const getAllBooksAdminAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-all-books`,"",reqHeader)
}

//Approve books by admin - /approve-books
export const approveBooksAPI = async(reqHeader,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/approve-books`,reqBody,reqHeader)
}

//Get all users - all-users
export const getAllUsersAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-users`,"",reqHeader)
}


//update admin profile - /admin-profile-update
export const adminProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-profile-update`,reqBody,reqHeader)
}












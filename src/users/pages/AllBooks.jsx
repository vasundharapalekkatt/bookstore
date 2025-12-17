import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'


const AllBooks = () => {

    const [status, setstatus] = useState(false)
    const [allBooks, setAllBooks] = useState([])
    const [tempAllBooks, setTempAllBookss] = useState([])
    const [token, setToken] = useState("")

    const {searchKey,setSearchKey} = useContext(searchKeyContext)
    console.log(searchKey);
    


    const getAllBooks = async (searchKey,token) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        //console.log(reqHeader);

        const result = await getAllBooksAPI(searchKey,reqHeader)
        // console.log(result);
        if (result.status == 200) {
            setAllBooks(result.data)
            setTempAllBookss(result.data)
        }
    }
    console.log(allBooks);


    //filter 
    const filter = (data) => {
        if (data == "NoFilter") {
            setAllBooks(tempAllBooks)
        } else {
            setAllBooks(tempAllBooks.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
        }
    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")

            setToken(tok)
            getAllBooks(searchKey,tok)
        }
    }, [searchKey])


    return (
        <>
            <Header />


            {token ?
                <>
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='mt-5 text-3xl font-medium'>Collections</h1>
                        <div className='flex my- w-full justify-center items-center'>
                            <input value={searchKey}
                            onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search By Title' className='border border-gray-200 placeholder-gray-200 p-2 w-1/4 me-2' />

                            {/*<button className='bg-blue-900 text-white py-2 px-3 shadow hover:border hover:text-blue-900 hover:bg-white'>Search</button>*/}

                        </div>
                    </div>
                    <div className='md:grid grid-cols-[1fr_4fr] md:p-10 p-5'>
                        <div>
                            <div className='flex mt-3 justify-between'>
                                <h1 className='text-2xl font-medium'>Filters</h1>
                                <span onClick={() => setstatus(!status)} className='md:hidden'><FontAwesomeIcon icon={faBars} /></span>
                            </div>

                            <div className={status ? "md:block" : 'md:block justify-center items-center hidden'}>

                                <div className='mt-3' onClick={() => filter("NoFilter")}>
                                    <input type="radio" id='NoFilter' name='filter' />
                                    <label htmlFor="NoFilter" className='ms-3'>AllBooks</label>
                                </div>

                                <div className='mt-3' onClick={() => filter("Literary")}>
                                    <input type="radio" id='Literary' name='filter' />
                                    <label htmlFor="Literary" className='ms-3'>Literary</label>
                                </div>

                                <div className='mt-3' onClick={() => filter("Fantasy")}>
                                    <input type="radio" id='Fantasy' name='filter' />
                                    <label htmlFor="Fantasy" className='ms-3'>Fantasy</label>
                                </div>

                                <div className='mt-3' onClick={() => filter("Detective")}>
                                    <input type="radio" id='Detective' name='filter' />
                                    <label htmlFor="Detective" className='ms-3'>Detective</label>
                                </div>

                                <div className='mt-3' onClick={() => filter("Philosophy")}>
                                    <input type="radio" id='Philosophy' name='filter' />
                                    <label htmlFor="Philosophy" className='ms-3'>Philosophy</label>
                                </div>


                            </div>
                        </div>

                        <div className='md:grid grid-cols-4 w-full mt-5'>
                            {allBooks?.length > 0 ?
                                allBooks?.map((item) => (
                                    <div className='p-3' hidden={item?.status == "pending" || item?.status == "sold" } >
                                        <img src={item?.imageurl} alt="NoImage" style={{ width: '100%', height: '300px' }} />
                                        <div className='flex justify-center flex-col items-center mt-3'>
                                            <p>{item?.author}</p>
                                            <h3>{item?.title}</h3>
                                            <Link to={`/view-books/${item?._id}`}><button className='w-full mt-3 px-3 py-2 bg-blue-900 text-white hover:border-blue-900 hover:text-black hover:bg-blue-300'>View More</button></Link>
                                        </div>
                                    </div>
                                ))

                                :
                                <p>No Books Added....</p>
                            }


                        </div>
                    </div>
                </>

                :

                <div className='grid grid-cols-3'>
                    <div></div>
                    <div className='flex justify-center items-center flex-col w-full'>
                        <img src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyM2xzMWVybjY0ajZ4c3J5aHA0dTN3MWQ1NndzOWttMDkwMTlxcXphayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/ocVFpiaTCxly9SKDit/giphy.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                        <p className='mt-3 text-2xl'>
                            Please{" "}
                            <Link to={"/login"} className='text-red-500 underline'>
                                Login</Link>{" "}
                            to explore more...
                        </p>
                    </div>
                    <div></div>
                </div>}

            <Footer />
        </>
    )
}

export default AllBooks
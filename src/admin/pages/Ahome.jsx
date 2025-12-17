import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Ahome = () => {

  const data = [
    {
      name: 'Page 123',
      uv: 10000,
      pv: 67000,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
    },
  ];

  const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];


  return (
    <>
      <AdminHeader />

      {/* side bar kodukkunnath ; common aayond aanu component create cheythe */}
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-200'>
          <AdminSideBar />
        </div>
        <div>
          <div className='p-10'>
            <div className='md:grid grid-cols-3'>
              {/* small boxes */}
              <div className='md:px-10 px-5'>
                <div className='bg-blue-900 p-4 flex rounded text-white'>
                  <FontAwesomeIcon icon={faBook} className='fa-3x' />
                  <div>
                    <h1 className='text-lg'>Total Number of Books</h1>
                    <h1 className='text-3xl'>100+</h1>
                  </div>
                </div>
              </div>

              <div className='md:px-10 px-5'>
                <div className='bg-yellow-900 p-4 flex rounded text-white'>
                  <FontAwesomeIcon icon={faBook} className='fa-3x' />
                  <div>
                    <h1 className='text-lg'>Total Number of Users</h1>
                    <h1 className='text-3xl'>100+</h1>
                  </div>
                </div>
              </div>

              <div className='md:px-10 px-5'>
                <div className='bg-green-900 p-4 flex rounded text-white'>
                  <FontAwesomeIcon icon={faBook} className='fa-3x' />
                  <div>
                    <h1 className='text-lg'>Total Number of Employees</h1>
                    <h1 className='text-3xl'>100+</h1>
                  </div>
                </div>
              </div>

            </div>
            <div className='md:grid grid-cols-2'>
            <div className='w-full h-80 mt-5'>
              <ResponsiveContainer width="100%" height="100%"> 
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8"  />
                <Bar dataKey="uv" fill="#82ca9d"  />
              </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='w-full h-80 mt-5'>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="50%" fill="#8884d8" />
                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" fill="#82ca9d" label />
                  </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          </div>
        </div>
        
      </div>
      <Footer />
    </>
  )
}

export default Ahome
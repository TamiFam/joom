import React from 'react'
import Welcoming from "../../../assets/dashboard/urban-welcome.svg"
import useUser from '../../../hooks/useUser'
import { Link } from 'react-router-dom'

const StudentCP = () => {
  const {currentUser} = useUser()
  return (
    <div className='h-screen flex justify-center items-center'>
    <div>
      <div>
      <div>
        <img  onContextMenu={e => e.preventDefault()} src={Welcoming} alt="" className='h-[200px]' placeholder='blur' />
      </div>
      <h1 className='text-4xl capitalize font bold'> Hi,<span className='text-3xl text-secondary items-stretch'>{currentUser.name}</span> Welcome to your DashBoard</h1>
      <p className='text-center text-base py-2'>Hi dear, This is  a simple dashboard home.  Our developers is trying to updating Dashboard </p>
      <div className='text-center'>
        <h2 className='font-bold'> You jump any page want from here</h2>
          <div className='flex items-center justify-center my-r gap-3'> 

            <div className=' border border-secondary  rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
              <Link to='/dashboard/enrolled-class'>My Enroll</Link>             
            </div>
            <div className='border-secondary border rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
              <Link to='/dashboard/my-selected'>My Selected</Link>             
            </div>
            <div className='border-secondary border rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
              <Link to='/dashboard/my-payments'>Payment History</Link>             
            </div>
            <div className='border-secondary border rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
              <Link to='/dashboard/apply-instructor'>Join as Instructor</Link>             
            </div>
          </div>
        
      </div>
      </div>
    </div>
  </div>
  )
}

export default StudentCP

import React from 'react'
import { Navigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import useUser from '../hooks/useUser'

const DashBoardNavigate = () => {
    const {currentUser, isLoading} = useUser()
    const role = currentUser?.role
    if(isLoading) {
        return <div className='flex justify-center items-center h-screen'><HashLoader color="#f40dcf" /></div>
      }
  if (role === 'admin')  return <Navigate to ='/dashboard/admin-home/' replace/>
  if (role === 'instructor')  return <Navigate to ='/dashboard/instructor-cp/' replace/>
  if (role === 'user')  return <Navigate to ='/dashboard/student-cp/' replace/>
    
  }


export default DashBoardNavigate
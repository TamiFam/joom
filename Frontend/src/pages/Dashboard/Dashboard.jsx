import React from 'react'
import useUser from '../../hooks/useUser'
import {HashLoader} from 'react-spinners'
import DashBoardNavigate from '../../routes/DashBoardNavigate'

const Dashboard = () => {
  const {currentUser, isLoading} = useUser()
  const role = currentUser?.role

  if(isLoading) {
    return <div className='flex justify-center items-center h-screen'><HashLoader color="#f40dcf" /></div>
  }
  return (
    <DashBoardNavigate/>
  )
}

export default Dashboard
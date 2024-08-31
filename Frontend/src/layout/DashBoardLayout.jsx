import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'
import {BiHomeAlt, BiSelectMultiple,BiLogInCircle} from "react-icons/bi"
import {FaUsers} from "react-icons/fa"


import {BsFillPostcardFill} from "react-icons/bs"
import {SiGoogleclassroom, SiInstructure} from "react-icons/si"
import {TbBrandAppleArcade} from "react-icons/tb"
import { NavLink ,Link, Outlet} from 'react-router-dom'
import { MdOfflineBolt } from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import { MdExplore } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

import Swal from "sweetalert2";
import {useNavigate } from 'react-router-dom';

import { MdPayments } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import Scroll from '../hooks/useScroll'
import { HashLoader } from 'react-spinners'

const adminNavItems = [
  {to: "/dashboard/admin-home", icon: <BiHomeAlt className=" text-2xl" />, label: "Dashboard Home"},
  {to: "/dashboard/manage-users", icon: <FaUsers className=" text-2xl" />, label: "Manage Users"},
  {to: "/dashboard/manage-class", icon: <BsFillPostcardFill className=" text-2xl" />, label: "Manage Class"},
  {to: "/dashboard/manage-application", icon: <TbBrandAppleArcade className=" text-2xl" />, label: "Manage Application"},
  
]

const instructorsNavItems =[
  {to: "/dashboard/instructor-cp", icon: <TbBrandAppleArcade className=" text-2xl" />, label: "Home"},
  {to: "/dashboard/add-class", icon: <MdExplore className=" text-2xl" />, label: "Add a Class"},
  {to: "/dashboard/my-classes", icon: <IoSchoolSharp className=" text-2xl" />, label: "My classes"},
  {to: "/dashboard/my-pending", icon: <MdPendingActions className=" text-2xl" />, label: "Pending courses"},
  {to: "/dashboard/my-approved", icon: <IoMdDoneAll className=" text-2xl" />, label: "Approved courses"},
]

const students = [
  {to: "/dashboard/student-cp", icon: <BiHomeAlt className=" text-2xl" />, label: "Dashboard"},
  {to: "/dashboard/enrolled-class", icon: <SiGoogleclassroom className=" text-2xl" />, label: "My enroll"},
  {to: "/dashboard/my-selected", icon: <BiSelectMultiple className=" text-2xl" />, label: "My selected"},
  {to: "/dashboard/my-payments", icon: <MdPayments className=" text-2xl" />, label: "Payment History"},
  {to: "/dashboard/apply-instructor", icon: <SiInstructure  className=" text-2xl" />, label: "Apply for Instructor"},
]
const lastMenuItems = [
  { to: "/" , icon: <BiHomeAlt className=" text-2xl" />, label: "Main Home"},
  { to: "/trending" , icon: <MdOfflineBolt className=" text-2xl" />, label: "Trending"},
  { to: "/browse" , icon: <GiFigurehead className=" text-2xl" />, label: "Folowing"},
]

const DashBoardLayout = () => {
  const [open, setOpen] = useState(true)
  const {loader, logout} = useAuth()
  const {currentUser,isLoading} = useUser()
  const navigate = useNavigate()
  const role = currentUser?.role

  const handleLogOut = () => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        .then(() => {
          Swal.fire({
          title: "Logout!",
          text: "Your file has been deleted.",
          icon: "success"
          
        }).then(() => {
        
          navigate('/')
        })
      })
        .catch((error) =>  console.log(error)

      );
    }
  });
}; 
                                                  {/*ROLESSSS  */}
                        // const role = "instructor"  
if(isLoading) {
   return <div className='flex justify-center items-center h-screen'><HashLoader color="#f40dcf" /></div>
     }
  return (
    <div className='flex'>
      <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative
      duration-300`}>
        <div className='flex gap-x-4 items-center'>
          <img  onClick={() => setOpen(!open)} src="/yoga-logo.png" alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[350deg]"}`}/>
          <Link to ='/'>
          <h1   className={`text-dark-primary cursor-pointer fone-bold origin-left text-xl
           duration-200 ${!open && 'scale-0'}`}>YogaMaster</h1>
          </Link>
        </div>
        {/*NavLinks menu */}
                 {/*admin roles */}
        {role ==="admin" && (<ul className='pt-6'>
            <p className={`ml-3 text-gray-400 ${!open && "hidden"}`}><small>Menu</small></p>
            {
               role ==="admin" &&  adminNavItems.map((menuItem, index) => (
                <li key={index} className='mb-2'>
                 <NavLink to={menuItem.to} className={({ isActive }) => `flex flex-row items-center ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"}
                  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`}>
                  {menuItem.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200` }>{menuItem.label}</span>
                  </NavLink>
                </li>
               ))
            }
          </ul>
        )}
                  {/*Instructor roles  */}
         {role ==="instructor" && (<ul className='pt-6'>
            <p className={`ml-3 text-gray-400 ${!open && "hidden"}`}><small>Menu</small></p>
            {
                instructorsNavItems.map((menuItem, index) => (
                <li key={index} className='mb-2'>
                 <NavLink to={menuItem.to} className={({ isActive }) => `flex flex-row items-center ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"}
                  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`}>
                  {menuItem.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200` }>{menuItem.label}</span>
                  </NavLink>
                </li>
               ))
            }
          </ul>
        )}
                   {/*students roles  */}
          {role ==="user" && (<ul className='pt-6'>
            <p className={`ml-3 text-gray-400 ${!open && "hidden"}`}><small>Menu</small></p>
            {
                students.map((menuItem, index) => (
                <li key={index} className='mb-2'>
                 <NavLink to={menuItem.to} className={({ isActive }) => `flex flex-row items-center ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"}
                  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`}>
                  {menuItem.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200` }>{menuItem.label}</span>
                  </NavLink>
                </li>
               ))
            }
          </ul>
        )}


        <ul className='pt-6'>
        <p className={`ml-3 text-gray-400 uppercase   ${!open && "hidden"}`}><small>UseFul Links</small></p>
        {
              lastMenuItems.map((menuItem, index) => (
                <li key={index} className='mb-2'>
                <NavLink to={menuItem.to} className={({ isActive }) => `flex flex-row items-center ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150
                 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`}>
                  {menuItem.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200` }>{menuItem.label}</span>
                  </NavLink>
                </li>
               ))
            }
            <li>
            <button 
            
            onClick={()  => handleLogOut()}
             className="flex duration-150
                 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white 
                 font-bold text-sm gap-x-4 whitespace-nowrap">

                 <BiLogInCircle  className='text-2xl'/>
                <span className= {`${!open  &&'hidden'} origin-left duration-200`}> </span>
                  </button>
            </li>
        </ul>
      </div>
      <div className='h-screen overflow-y-auto px-8 flex-1'>
        <Scroll/>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashBoardLayout
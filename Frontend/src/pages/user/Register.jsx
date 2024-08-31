import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";

import { useForm, } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/headers/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate()
  const {SignUp,updateUser,setError} = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit  = data =>  {
    console.log(data.password)
    
    SignUp(data.email, data.password).then((result)=> {
      const user = result.user
      if(user) {
        return updateUser(data.name, data.photoUrl)
        .then(()=> {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: data?.photoURL,
            role: 'user',
            gender: data.gender,
            phone: data.phone,
            address: data.address
          }
          if(user.email && user.displayName) {
            return axios.post('http://localhost:3000/new-user', userImp).then(()=> {
              navigate('/')
              return "Registration done"
            }).catch((err)=> {
              throw new Error(err)
            })
          }
        }).catch((err)=> {
          setError(err.code)
          throw new Error(err)
        })
      }
      
    })
  }
  const password = watch('password','')
  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold t text-center mb-6'>Please Register</h2>
        {/*form data */}
        <form  onSubmit={handleSubmit(onSubmit)} >
          <div className='flex items-center gap-5 '>{/*Name  and Email*/}
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
              Name
                </label>
                <input type="text" placeholder='Enter your name' {...register("name", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 
                focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
                <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
              Email
                </label>
                <input type="text" placeholder='Enter your email address' {...register("email", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 
                focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
          </div>
          <div className='flex items-center gap-5 '>  {/*password  and confirm Password*/}
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
              Password
                </label>
                <input type="password" placeholder='confirm password'
                 {...register("password", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 
                focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
                <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
              Confirm Password
                </label>
                <input type="password" placeholder='Confirm ur password'
                 {...register("confirmPassword", { required: true, validate: (value)=> value === password  || "password not matched!",})}
                 className=' w-full border-gray-300 border rounded-md py-2 px-4
                  focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
          </div>
          <div className='flex items-center gap-5 '>  {/*phone and photoUrl */}
            <div className='mb-4'>
              <label htmlFor="phone" className='block text-gray-700 font-bold mb-2'>
              <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg' />
              Phone
                </label>
                <input type="tel" placeholder='phone' {...register("phone", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 
                focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
                <div className='mb-4'>
              <label htmlFor="photoUrl" className='block text-gray-700 font-bold mb-2'>
              <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg' />
              PhotoURL
                </label>
                <input type="url" placeholder='ur photo' {...register("photoURL")} className='w-full border-gray-300 border rounded-md py-2 px-4 
                focus:outline-none focus:ring  focus-border-blue-200' />
                </div>
          </div>
          <div >   {/*gender and address  */}
          <div className='mb-4'>
              <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
              Gender
                </label>
                <select {...register("gender", {required: true})} className='w-full border border-gray-300
                 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                  <option value="" disabled selected>Select gender</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">gay(не желетельно)</option>
      </select>
                </div>
                <div className='mb-4'>
              <label htmlFor="address" className='block text-gray-700 font-bold mb-2'>
              <IoLocationOutline className='inline-block mr-2 mb-1 text-lg' />
              Address
                </label>
                <textarea  rows={3} placeholder='Enter Address'{...register("address", {required: true})} className='w-full border border-gray-300
                 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                 
      </textarea>
                </div>
                
          </div>
          <div className='text-center'>
            <button type='submit' className='  px-4 py-2 bg-secondary hover:bg-red-500 text-white rounded-md  '>Reggister if u not nigga</button>
            {
            errors && (<div className='text-red-500 text-sm w-full mt-1'>
              <p>Password doesn't match</p>
            </div>)
          }
          </div>                           
        </form>
        <p className='text-center text-sm  text-gray-500'> Already have an account?<Link  className='underline' to="/login "> LOGIN</Link>
          
        </p>
        <GoogleLogin/>
      </div>
    </div>
  )
}

export default Register
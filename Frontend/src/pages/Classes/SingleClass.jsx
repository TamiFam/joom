import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


import {DialogActions } from "@mui/material"
import {BiTime} from "react-icons/bi"
import {FaLanguage, FaLevelUpAlt, FaUser,FaUsers} from "react-icons/fa"
import {GiClassicalKnowledge} from "react-icons/gi"
import {MdBookOnline} from "react-icons/md"
import mentor from '../../assets/home/mentor.png'

const SingleClass = () => {
  const navigate = useNavigate()
    const course = useLoaderData()
    // console.log(courses)
    const {currentUser} = useUser()
    // console.log(currentUser)
    const role = currentUser?.role
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch()
    const axiosSecure = useAxiosSecure()
    const handleSelect = async (id) => {
      if (!currentUser) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Пожалуйста, залогинься",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        
        return navigate('/login');
      }
    
      try {
        // Fetch enrolled classes
        const enrolledResponse = await axiosSecure.get(`/enrolled-classes/${currentUser?.email}`);
        const enrolledClasses = enrolledResponse.data;
        setEnrolledClasses(enrolledClasses);
    
        // Check if the class is already in the cart
        const cartResponse = await axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`);
        const cartItem = cartResponse.data;
    
        if (cartItem && cartItem.classId === id) {
          const Toast =  Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          await Toast.fire({
            icon: "error",
            title: "Уже добавлен"
          });
          return
        }
    
        // Check if the class is already enrolled
        if (enrolledClasses.find(item => item.classes._id === id)) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Уже записан",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
    
        // Add the class to the cart
        const data = {
          classId: id,
          userMail: currentUser?.email,
          date: new Date()
        };
    
        const addToCartResponse = await axiosSecure.post('/add-to-cart', data);
        const Toast = await Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        await Toast.fire({
          icon: "success",
          title: "add to cart",
        });
       
        console.log(addToCartResponse.data);
    
      } catch (error) {
        console.error('Error handling class selection:', error);
      }
    };
  
    return (
      <div className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto'>
        <div className='breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
          <div className='container text-center'>
            <h2 className='text-center'>Courses details</h2>
          </div>
        </div>
  
        <div className='nav-tab-wrapper tabs section-padding mt-8'>
          <div className='container flex flex-wrap lg:flex-nowrap'>
            {/* Left side */}
            <div className='lg:w-1/2 w-full lg:pr-4'>
              <div className='single-course-details'>
                <div className='xl:h-[770px] h-[350px] mb-10 course-main-thumb'>
                  <img src={course.image} alt="" className='rounded-md object-cover w-full h-full block' />
                </div>
                <h2 className='text-2xl mb-2'>{course?.name}</h2>
  
                <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                  <div className='flex space-x-4 items-center group'>
                    <div className='flex-none'>
                      <div className='h-12 w-12 rounded'>
                        <img src={course.image} alt="" className='object-cover w-full h-full rounded' />
                      </div>
                    </div>
                    <div className='flex-1'>
                      <p className='text-secondary'>Trainer
                        <a href="#" className='text-black'> : {course.instructorName}</a>
                      </p>
                    </div>
                  </div>
  
                  <div>
                    <span className='text-secondary'>
                      Last Update:
                      <a href="#" className='text-black ml-1'>
                        {new Date(course.submitted).toLocaleDateString()}
                      </a>
                    </span>
                  </div>
                </div>
  
                <div className='nav-tab-wrapper mt-12'>
                  <ul id='tabs-nav' className='course-tab mb-8'>
                    <li className='active'>
                      <a href="#tab1">Overview</a>
                    </li>
                    <li>
                      <a href="#tab2">Carriculum</a>
                    </li>
                    <li>
                      <a href="#tab3">Instructor</a>
                    </li>
                    <li>
                      <a href="#tab4">Reviews</a>
                    </li>
                  </ul>
                  <div id='tabs-content'>
                    <div id='tab1' className='tab-content'>
                      <div>
                        <h3 className='text-2xl mt-8'>Course Sescription</h3>
                        <p className='mt-4'>
                          This tutuorial will help you learn quickly and througly. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit. Asperiores accusantium
                          dolore porro blanditiis officia velit inventore, illum fugit fuga explicabo labore
                          facere laboriosam quaerat assumenda quod similique! Est, neque iste.
                        </p>
                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                          <h4 className='text-2xl'>What You will Learn?</h4>
                          <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                            <li className='flex space-x-3'>
                              <div className='flex-none relative top-1'>
                                <img src="/correct-mark.png" alt="" />
                              </div>
                              <div className='flex-1'>
                                Learn how perspective works and how to incorporate your art
                              </div>
                            </li>
                            <li className='flex space-x-3'>
                              <div className='flex-none relative top-1'>
                                <img src="/correct-mark.png" alt="" />
                              </div>
                              <div className='flex-1'>
                                Learn how prespective works and how to incorporate your art
                              </div>
                            </li>
                            <li className='flex space-x-3'>
                              <div className='flex-none relative top-1'>
                                <img src="/correct-mark.png" alt="" />
                              </div>
                              <div className='flex-1'>
                                Learn how prespective works and how to incorporate your art
                              </div>
                            </li>
                            <li className='flex space-x-3'>
                              <div className='flex-none relative top-1'>
                                <img src="/correct-mark.png" alt="" />
                              </div>
                              <div className='flex-1'>
                                Learn how prespective works and how to incorporate your art
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='text-2xl'>What You will Learn?</h4>
                          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gird-cols-1 gap-5 mt-5'>
                            <div className='bg-white rounded px-5 py-[18px] flex shadow-box-2 space-x-[10px] items-center'>
                              <span className='flex-none'>
                                <img src="/logo.png" alt="" />
                              </span>
                              <span>
                                Computer/Mobile
                              </span>
                            </div>
                            <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                              <div className='flex-none'>
                                <img src="/logo.png" alt="" />
                              </div>
                              <span className='flex-1 text-black'>
                                Paper &amp; Pencil
                              </span>
                            </div>
                            <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                              <div className='flex-none'>
                                <img src="/logo.png" alt="" />
                              </div>
                              <span className='flex-1 text-black'>
                                Interner Connect
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id='tab2' className='tab-content'>
                      <div>
                        <h3 className='mt-4'>Lesson Plan</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ver
                          o aliquam debitis dolor sint consecte
                          tur facilis minus consequatur tempore obcaecati veniam, unde incidunt nisi
                          Deserunt dignissimos cum eos ducimus ratione.
                          <br /> <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ver
                          o aliquam debitis dolor sint consecte
                          tur facilis minus consequatur tempore obcaecati veniam, unde incidunt nisi
                          Deserunt dignissimos cum eos ducimus ratione.</p>
                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                          <h4 className='text-2xl'>This Course is For Beginners</h4>
                        </div>
                        <div>
                          <h4 className='text-2xl'></h4>
                          <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ver
                            o aliquam debitis dolor sint consecte
                            tur facilis minus consequatur tempore obcaecati veniam, unde incidunt nisi
                            Deserunt dignissimos cum eos ducimus ratione.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right side */}
            <div className='lg:w-1/2 w-full lg:pl-4'>
              <div className='course-details-sidebar'>
                <div className='course-price bg-white p-6 rounded-md shadow-md'>
                  <div className='price text-2xl font-bold mb-4'>
                    <span className='text-primary'>$</span>{course.price}
                    
                  </div>
                  <div className='flex justify-center'>
                    
                  <button  onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' : course.availableSeats < 1 ? 'No seat Available' : 'You can select Classes'}
                    disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1} className=' text-black dark:text-white bg-secondary items-center py-3  px-20 rounded-md'>
                    Enroll Now
                  </button>
                  </div>
                  
                </div>
  
                <div className='course-meta bg-white p-6 rounded-md shadow-md mt-6'>
                  <div className='rating mb-4'>
                    <span className='text-yellow-500'>★</span> {course.rating} ({course.reviews} Reviews)
                  </div>
                  <div className='duration mb-4 text-black dark:text-white'>
                  Instructor:
                  <a href="#" className='text-black dark:text-white'>  {course.instructorName}</a>
                  </div>
                  <div className='lessons mb-4'>
                    Enrolled: {course.totalEnrolled}
                  </div>
                  <div className='language mb-4'>
                    Language: {course.language}
                  </div>
                  <div className='access mb-4'>
                    Access: {course.access}
                  </div>
                </div>
  
                <div className='course-share bg-white p-6 rounded-md shadow-md mt-6'>
                  <h4 className='text-lg font-medium mb-4'>Share This Course</h4>
                  <div className='social-icons flex space-x-4'>
                    <a href='#' className='text-blue-600'>
                      <i className='fab fa-facebook-f'></i>
                    </a>
                    <a href='#' className='text-blue-400'>
                      <i className='fab fa-twitter'></i>
                    </a>
                    <a href='#' className='text-red-600'>
                      <i className='fab fa-google-plus-g'></i>
                    </a>
                    <a href='#' className='text-blue-300'>
                      <i className='fab fa-linkedin-in'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleClass;
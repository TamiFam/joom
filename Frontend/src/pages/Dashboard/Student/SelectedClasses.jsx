import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { HashLoader } from 'react-spinners'
import moment from 'moment'
import { MdDeleteSweep } from "react-icons/md";
import { FiCloudLightning, FiDollarSign } from "react-icons/fi";
import Swal from 'sweetalert2'

const SelectedClasses = () => {
    const {currentUser} = useUser()
    const [loading,setLoading] = useState(true)
    const [classes,setClasses] = useState([])
    const [paginateData,setPaginateData] = useState([])
    const [page,setPage] = useState(1)
    const itemPerPage = 5
    const totalPage = Math.ceil(classes.length / itemPerPage) + 1
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure
        .get(`/cart/${currentUser?.email}`)
        .then((res) => {
            setClasses(res.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    },[])
                 {/*Подсчет цены в корзине */}
    const totalPrice = classes.reduce((acc,item)=> acc + parseInt(item.price), 0)
    const totalTax = totalPrice * 0.01
    const price = totalPrice + totalTax

    const handlePay = (id) => {
        const item = classes.find((item)=> item._id === id)
        const price = item.price
        navigate(`/dashboard/user/payment`, {state: {price: price, itemId: id}})
        // console.log(item._id)
        // console.log(price)
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`).then((res) => {
                    
                    console.log('FULL RESPONSE :',res)
                    if(res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your cart has been deleted.",
                        icon: "success"
                      });
                      const newClasses = classes.filter((item) => item._id !== id)
                      setClasses(newClasses)
                    }
                }).catch((error) => console.log(error))
              
            }
          });
    }
    // if(loading) {
    //     return <div className='flex justify-center items-center h-screen'><HashLoader color="#f40dcf" /></div>
    //       }

  return (
    <div >
        <div className='my-6 text-center'>
            <h1 className='text-4xl font-cold'>My <span className='text-secondary'>Selected</span> classes</h1>
        </div>
        <div className='h-screen'>
        <div className='container mx-auto px-4'>
        <h2 className='text-2xl font-semibold mb-4'>Shoping Cart:</h2>
        <div className='flex flex-col md:flex-row gap-4'>
            {/*Left div */}
            <div className='md:w-3/4'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='text-left font-semibold'>#</th>
                                <th className='text-left font-semibold'>Product</th>
                                <th className='text-left font-semibold'>Price</th>
                                <th className='text-left font-semibold'>Date</th>
                                <th className='text-left font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        {/*Table body */}
                        <tbody>
                            {
                                classes.length === 0 ? <tr key="no-classes"><td colSpan='5' className='text-2xl font-bold'> No classes found </td></tr> 
                                : classes.map((item,idx) => {
                                    const leftIdx = (page -1) * itemPerPage +idx +1
                                    return <tr key={item._id}>
                                        <td className='py-4'>{leftIdx}</td>
                                        <td className='py-4'>
                                            <div className='flex items-center'>
                                                <img src={item.image} alt=""  className='h-16 w-16 mr-4'/>
                                                <span>{item.name}</span>
                                            </div>
                                        </td>
                                        <td className='py-4'>{item.price} rub</td>
                                        <td className='py-4'> 
                                        <p className='text-green-700 text-sm'> 
                                            {moment(item.submitted).format("MMMM Do YYYY")}
                                        </p>
                                        </td>
                                        <td className='py-4 flex pt-8 gap-2'>
                                            <button  onClick={() => handleDelete(item._id)}className='px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'><MdDeleteSweep/></button>
                                            <button onClick={() => handlePay(item._id)} className='px-3 py-1 cursor-pointer  bg-green-500 rounded-3xl flex items-center mr-2'><FiDollarSign/></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

             {/*Right div */}
            <div className='md:w-1/5 fixed right-3'>
                <div className='bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-lg font-semibold mb-4'>Summary</h2>
                <div className='flex justify-between mb-2'>
                    <span>Subtotal</span>
                    <span>{totalPrice} RUB</span>
                </div>
                <div className='flex justify-between mb-2'>
                            <span>Taxes</span>
                            <span>
                                {totalTax.toFixed(2)}
                            </span>
                </div>
                <div className='flex justify-between mb-2'>
                    <span>Extra Fees</span>
                    <span>0 RUB</span>
                </div>
                <hr  className='my-2'/>
                <div className='flex justify-between mb-2'>
                    <span className='font-semibold'>Total</span>
                    <span className='font-semibold'>{price.toFixed(2)}</span>
                </div>
                <button disabled={classes.price <=0} onClick={() => navigate('/dashboard/user/payment', {state: {price: price, itemId: null}})} className='bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full'>
                    Checkout
                </button>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default SelectedClasses
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
const Classes = () => {
  
  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  // console.log('currentUser:', currentUser)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
const navigate = useNavigate()

  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch.get('/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSelect = async (id) => {
  if (!currentUser) {
    const Toast =  Swal.mixin({
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    await Toast.fire({
      icon: "pending",
      title: "Пожалуйста залогинься"
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
      const Toast = await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      await Toast.fire({
        icon: "error",
        title: "Уже добавлен..."
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
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    await Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });

    console.log(addToCartResponse.data);

  } catch (error) {
    console.error('Error handling class selection:', error);
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    return
  }
};

      

     

  

  return (
    <div>
      <div className='mt-25 pt-3'>
        <h1 className='text-4xl font-bold text-center text-secondary'>Classes</h1>
      </div>
      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {classes.slice(0, 5).map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${cls.availableSeats < 1 ? "bg-red-300" : "bg-white"} dark:bg-slate-600 rounded-lg shados-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className='relative h-48'>
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`} />
              <img src={cls.image} alt="" className='object-cover w-full h-full' />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button onClick={() => handleSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' : cls.availableSeats < 1 ? 'No seat Available' : 'You can select Classes'}
                    disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1}
                    className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>
                    Add to card
                  </button>
                </div>
              </Transition>
            </div>
            <div className='px-6 py-2'>
              <h3 className={`font-sembioid mb-1 ${cls.name.length > 24 ? 'text-11px font-bold mb-3' : 'text-base'}`}>{cls.name}</h3>
              <p className='text-gray-500 text-xs'>Instructor: {cls.instructorName}</p>
              <div className='flex justify-between'>
                <span className={`text-gray-600 text-sx ${cls.name.length > 14 ? 'text-14px font-bold mb-3' : 'text-base'}  `}>Available seats: {cls.availableSeats}</span>
                
                <span className='text-green-500 font-semibold text-sm'>{cls.price}rub</span>
                
                
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
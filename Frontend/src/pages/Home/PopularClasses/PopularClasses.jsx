import React, {useEffect,useState} from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import Card from './Card'

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch()
  const [classes, setClasses] = useState([])
  useEffect(() => {
    const fetchClasses = async() => {
      const response = await axiosFetch.get('/classes')
      setClasses(response.data)
      console.log(response )  
    }
    fetchClasses()
  }, [])
  // console.log(classes)
  return (
    <div className='md:w-[80%] mx-auto my-36'>
<div>
    <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Popular</span> Classes</h1>
    <div className='w-[40%] text-center mx-auto'>
        <p className='text-gray-500'>Explore our Popular Classes . Here is some popular classes on How many student enrollled</p>
    </div>
</div>
<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
{classes.slice(0,6).map((item) => (
  <Card
    key={item._id}
    _id={item._id}
    name={item.name}
    image={item.image}
    availableSeats={item.availableSeats}
    totalEnrolled={item.totalEnrolled}
    price={item.price}
  />
))}
</div>
    </div>
  )
}

export default PopularClasses
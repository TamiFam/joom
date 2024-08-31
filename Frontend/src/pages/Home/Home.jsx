import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallary from './Gallary/Gallary'
import PopularClasses from './PopularClasses/PopularClasses'
import PopulatTeacher from './PopularTeacher/PopulatTeacher'

const  Home = ()  => {
  
  console.log(import.meta.env.VITE_APIKEY)
  return (
    <section>
      <HeroContainer/>
      <div className='max-w-screen-xl mx-auto'>
        <Gallary/>
        <PopularClasses/>
        <PopulatTeacher/>
      </div>
    </section>
  )
}

export default Home
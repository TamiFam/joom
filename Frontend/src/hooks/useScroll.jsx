import { useLocation, } from "react-router-dom"
import React, { useEffect } from 'react'

const Scroll = () => {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0 ,0)
    }, [pathname])
}
export default Scroll
import React from 'react'
import Navbar from './Navbar'
import Cookie from './aggreements/Cookie'
import Kullanım from './aggreements/Kullanım'
import { useParams } from 'react-router'
import Footer from "./Footer"
import User from './aggreements/User'
import Privacy from './aggreements/Privacy'
import Us from './aggreements/Us'
const Agreement = () => {
  const { id } = useParams();
  return (
    <div className='bg-backgroundColor min-h-screen h-full min-w-screen'>
        <Navbar/>
        <div className='container mx-auto px-48 py-10'>
            {id === "cookie" ? <Cookie/> : id === "kullanıcı" ? <Kullanım/>: id ==="privacy" ? <Privacy/> : id=="us" ? <Us/> : <User/>}
            
        </div>
        <Footer/>
    </div>
  )
}

export default Agreement
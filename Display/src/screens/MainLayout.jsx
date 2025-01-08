import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './auth/Nav'

const MainLayout = () => {
  return (
    <div>
        <Nav/>
        <div className=''>
        <Outlet />
         </div>
    </div>
  )
}

export default MainLayout
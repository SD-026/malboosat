import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './auth/Nav'
import Dashboard from './Dashboard'

const MainLayout = () => {
  return (
    <div>
      <Nav>
        
        <div className=''>
        <Outlet />
         </div>
         </Nav>
    </div>
  )
}

export default MainLayout
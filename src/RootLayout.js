import React from 'react'
import NavigationBar from './components/navbar/NavigationBar'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <div className="content-container">
      <NavigationBar />
        <div className="container">
            <Outlet/>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
        </div>
        
    </div>
  )
}

export default RootLayout
import React, { useState } from 'react'
import './UserProfile.css'
import { useContext } from 'react'
import loginContext from '../../contexts/loginContext'
import { Navbar } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import axios from 'axios'

function UserProfile() {

  let [currentUser, loginErr, userLoginStatus, loginUser, logoutUser] = useContext(loginContext)
  
  let [err, setErr] = useState("")
  let [data, setData] = useState("")

  // get data from protected route
  const getProtectedData = ()=>{
    // get token from local storage
    let token = localStorage.getItem("token")

    // make a request to the backend api with this token as header value
    axios.get("http://localhost:3200/users-api/test", {headers:{"Authorization":"Bearer"+token}})
    .then((response)=>{
      setData(response.data.message)
      console.log(response.data.message);
    })
    .catch(err=>{
      setErr(err.message)
      console.log(err.message);
    })
  }

  console.log(currentUser);

  return (
    <div className=''>
      <p className="display-3 text-end">Welcome, {currentUser.username}
      <img src={currentUser.image} width="50px" className='float-end' alt="" /></p>

      <buttton className="btn btn-danger mx-auto" onClick={getProtectedData}>Get Protected Data</buttton>
      
      {/* <ul className="nav justify-content-between">
        <li className="nav-item">
          <NavLink className="nav-link" to="products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">Cart</NavLink>
        </li>
      </ul> */}

      
      
      <Outlet />
    </div>
  )
}

export default UserProfile
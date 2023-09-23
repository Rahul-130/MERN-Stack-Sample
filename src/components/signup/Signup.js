import axios from 'axios'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {

  // use form hook
  let {register, handleSubmit, formState:{errors}, setValue, getValues} = useForm()
  // HTTP req error
  let [err, setErr] = useState("")
  let [selectedFile, setSelectedFile] = useState(null)

  // navigate
  const navigate = useNavigate()

  
  let addNewUser = (newUser) =>{
    // console.log(newUser);
    // make HTTP POST request to save newUser to API

    let fd = new FormData()
    // append newUser to form data  JSON.stringify()-converts the obj to string
    fd.append("user", JSON.stringify(newUser))
    // append selected file to form data
    fd.append("photo", selectedFile)

    axios.post("http://localhost:3200/users-api/signup", fd)
    .then(response =>{
      if(response.status === 201){
        // navigate to login component
        navigate('/login')
      }
      if(response.status !== 201){
        setErr(response.data.message)
      }
    })
    .catch((err)=>{
      // the client was given error response (5xx, 4xx)
      if(err.response){
        setErr(err.message)
      }
      // the client never recived a response
      else if(err.request){
        setErr(err.message)
      }
      // for other error
      else{
        setErr(err.message)
      }
    })
  } 

  // on file select
  const onFileSelect = (e)=>{
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div className='mb-5'>
      <h2 className='text-center'>Register Form</h2>
      {/* HTTP error message */}
      {err.length!==0 &&  <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
      <div className="row">
        <div className="col-1 col-sm-2"></div>
        <div className="col-10 col-sm-8">
          <form onSubmit={handleSubmit(addNewUser)}>
            {/* username */}
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id='username' placeholder='Username' {...register("username", {required: true})} />
              <label htmlFor="username">Username</label>
              {/* validation of username */}
            {errors?.username?.type === "required" && <p className='text-danger fw-bold fs-6'>*Username is Required</p>}
            </div>

            {/* password */}
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id='password' placeholder='Password' {...register("password", {required: true})} />
              <label htmlFor="password">Password</label>
              {/* validation of password */}
            {errors?.password?.type === "required" && <p className='text-danger fw-bold fs-6'>*Password is Required</p>}
            </div>
            
            {/* email */}
            <div className="form-floating mb-3">
              <input type="email" id="email" className="form-control" placeholder='Email' {...register("email", {required: true})}/>
              <label htmlFor="email">Email</label>
              {/* validation of email */}
            {errors?.email?.type === "required" && <p className='text-danger fw-bold fs-6'>*Email is Required</p>}
            </div>
            
            {/* dob */}
            <div className="form-floating mb-3">
              <input type="date" id="dob" className="form-control" placeholder='Date of Birth' {...register("dob", {required: true})} />
              <label htmlFor="dob">Date of Birth</label>
              {/* validation of dob */}
              {errors.dob?.type === "required" && <p className='text-danger fw-bold fs-6'>*Date of Birth is Required</p>}
            </div>

            {/* profile URL */}
            <div className="form-floating mb-3">
              <input type="file" className="form-control" placeholder='User Image' onInput={onFileSelect} {...register("image", {required: true})}/>
              <label htmlFor="image">Select Profile pic</label>
              {/* validation of profile image */}
            {errors?.profile?.type === "required" && <p className='text-danger fw-bold fs-6'>*Profile url is Required</p>}
            </div>

            {/* button */}
            <div className='d-block text-end'>
              <button className="btn btn-success">Register</button>
            </div>
          </form>
        </div>
        <div className="col-1 col-sm-2"></div>
      </div>
    </div>


    // <div className='add-user'>
    //   <p className="display-3 text-center">Add New User</p>
    //   {/* HTTP error message */}
    //   {err.length!==0 && <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
    //   {/* responsive form */}
    //   <div className="row">
    //     <div className="col-11 col-sm-8 col-md-6 mx-auto">
    //       <form onSubmit={handleSubmit(submitForm)}>
    //         {/* name */}
    //         <div className="mb-3">
    //           <label htmlFor="name">Name</label>
    //           <input type="text" id="name" className='form-control' {...register("name", {required: true})} />
    //           {/* validation error for name */}
    //           {errors.name?.type === "required" && <p className='text-danger fw-bold fs-6'>*Name is required</p>}
    //         </div>
    //         {/* email */}
    //         <div className="mb-3">
    //           <label htmlFor="email">Email</label>
    //           <input type="text" id="email" className='form-control' {...register("email", {required: true})} />
    //           {/* validation error for name */}
    //           {errors.email?.type === "required" && <p className='text-danger fw-bold fs-6'>*Email is required</p>}
    //         </div>
    //         {/* date of birth */}
    //         <div className="mb-3">
    //           <label htmlFor="dob">Date of birth</label>
    //           <input type="date" id="dob" className='form-control' {...register("dob", {required: true})} />
    //           {/* validation error for name */}
    //           {errors.dob?.type === "required" && <p className='text-danger fw-bold fs-6'>*Date of birth is required</p>}
    //         </div>
    //         {/* image url */}
    //         <div className="mb-3">
    //           <label htmlFor="image">User Image</label>
    //           <input type="text" id="image" className='form-control' {...register("image", {required: true})} />
    //           {/* validation error for name */}
    //           {errors.image?.type === "required" && <p className='text-danger fw-bold fs-6'>*Image URL is required</p>}
    //         </div>
    //         {/* submit button */}
    //         <button type='submit' className='btn add-user-btn'>Create New User</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Signup
import { useState, useContext, useEffect } from "react";
import "./Login.css";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginContext from "../../contexts/loginContext";

function Login() {

    // useContext --- API Context
    let [currentUser, loginErr, userLoginStatus, loginUser, logoutUser] = useContext(loginContext)

    // error state
    // let [error, setError] = useState("")

    // navigate
    const navigate = useNavigate()

    // use form hook
    let {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
    } = useForm();


    let submitUser = (userCredObj) => {
        loginUser(userCredObj)
    };

    useEffect(()=>{
        if(userLoginStatus === true){
            navigate("/user-profile")
        }
    },[userLoginStatus])

    return (
        <div className="login">
            <h1 className="text-center">Login Form</h1>
            {/* form submission error */}
            {loginErr?.length !== 0 && (<p className="display-4 text-danger text-center">{loginErr}</p>)}
            <div className="row">
                <div className="col-2 col-sm-2 col-md-2 col-lg-3"></div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit(submitUser)}>
                        {/* username */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Username"
                                {...register("username",{required:true})}
                            />
                            <label htmlFor="username">Username</label>
                            {/* username validation */}
                            {errors?.username?.type === "required" && <p className="text-danger fw-bold fs-6">*Username Required</p>}
                        </div>
                        {/* username validation error message */}
                        {/* {error?.username.type === "required" && <p className="text-danger">{error.username.message}</p>} */}

                        {/* password */}
                        <div className="form-floating mb-3">
                          <input type="password" id="password" className="form-control" placeholder="Password" {...register("password", {required:true})}/>
                          <label htmlFor="password">Password</label>
                          {/* password validation */}
                          {errors?.password?.type === "required" && <p className="text-danger fw-bold fs-6">*Password Required</p>}
                        </div>

                        {/* button */}
                        <div className="d-block text-end">
                          <button type="submit" className="btn btn-success">Login</button>
                        </div>
                        
                    </form>
                </div>
                <div className="col-2 col-sm-2 col-md-2 col-lg-3"></div>
            </div>
        </div>
    );
}

export default Login;

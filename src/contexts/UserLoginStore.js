import {useState} from 'react'
import axios from 'axios'
import loginContext from './loginContext'

function UserLoginStore({children}) {

    let [currentUser, setCurrentUser] = useState({})
    let [loginErr, setLoginErr] = useState("")
    const [userLoginStatus, setUserLoginStatus] = useState(false)

    // function to make user login request
    const loginUser = (userCredObj) => {
       axios.post("http://localhost:3200/users-api/login", userCredObj)
       .then((response) => {
        if(response.data.message === "success"){
            // console.log("navigated to user profile");
            setCurrentUser({...response.data.user})
            // update user login status
            setUserLoginStatus(true)
            // update error status
            setLoginErr("")
            // save token to local storage
            localStorage.setItem("token", response.data.token)
            // sessionStorage.setItem("token", response.data.token)
        } else{
            console.log("User login failed", response.data.message)
            setLoginErr(response.data.message)
            // setLoginErr(error.message)
        }
       })
       .catch(err => {
        console.log("err in user login", err);
       })
    }


    // logout user
    const logoutUser = ()=>{
      localStorage.clear()
      setUserLoginStatus(false)
    }

  return (
    <loginContext.Provider value={[currentUser, loginErr, userLoginStatus, loginUser, logoutUser]}>
        {children}
    </loginContext.Provider>
  )
}

export default UserLoginStore
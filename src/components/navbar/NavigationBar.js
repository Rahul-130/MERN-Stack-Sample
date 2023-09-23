import React, {useContext} from "react";
import "./NavigationBar.css";
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import loginContext from "../../contexts/loginContext";


function NavigationBar() {

    let [currentUser, loginErr, userLoginStatus, loginUser, logoutUser] = useContext(loginContext)

    return (
        <div className="mb-5">
            <Navbar collapseOnSelect expand="sm"  bg="dark" data-bs-theme="dark">
                    <Navbar.Brand to="/" className="ms-2">
                        <Link>
                            <FcShop className="fs-1"/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-3"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end me-3">
                        <Nav className="text-end">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            

                            {userLoginStatus ?( 
                            <NavLink className="nav-link" to="/login" onClick={logoutUser}>Logout</NavLink>) :
                            (
                            <>
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                <NavLink className="nav-link" to="/signup">Register</NavLink>
                            </> 
                            )}

                            <NavLink className="nav-link" to="/aboutus">About us</NavLink>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationBar;

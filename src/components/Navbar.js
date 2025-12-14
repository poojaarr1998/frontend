import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/action/authActions.js";
import './common.css';

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    console.log()
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg navbar-gradient">
            <div className="container">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hello, {user.name}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        👤 My Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-order">
                                        Create Order
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/order-list">
                                        Order List
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="btn btn-outline-light ms-2"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link to="/login" className="btn btn-outline-light">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="btn btn-outline-light">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

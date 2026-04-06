import React, { useContext } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import API from "../services/axiosInstance"

export default function Navigation() {

    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleLogout() {
        await API.post("/logout")
            .then(res => {
                logout()
                navigate("/login")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
            <div className="container">

                <Link className="navbar-brand brand-mark" to="/">Market<span className="brand-accent">Flow</span></Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav me-auto">

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/login">Login</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/register">Register</NavLink>
                                </li>
                            </>
                        )}

                        {user?.role == 'seller' && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/seller/dashboard">Dashboard</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/seller/add-product">Add Product</NavLink>
                                </li>
                            </>
                        )}

                        {user?.role == "buyer" && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/buyer/dashboard">Dashboard</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/buyer/cart">Cart</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link app-nav-link" to="/buyer/order">Orders</NavLink>
                                </li>
                            </>
                        )}

                    </ul>

                    {user && (
                        <div className="navbar-user-chip me-lg-3">
                            <span>{user.name || user.email}</span>
                            <span className="text-uppercase small">{user.role}</span>
                        </div>
                    )}

                    {user && (
                        <button
                            className="btn btn-outline-light rounded-pill px-4"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    )
}

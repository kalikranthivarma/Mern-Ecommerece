import React, { useState, useContext } from "react"
import axios from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function BuyerLogin() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/buyer/login", formData)
            if (res.data.accessToken) {
                login(res.data)
                alert("Login Successful")
                navigate("/")
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container auth-shell">
            <div className="auth-card w-100">
                <div className="text-center mb-4">
                    <span className="hero-kicker">Buyer access</span>
                    <h2 className="mb-2">Welcome back</h2>
                    <p className="section-subtitle mb-0">Sign in to view your cart, orders, and checkout details.</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-brand rounded-pill w-100 py-2" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import axios from '../../services/axiosInstance.jsx'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [otp, setOtp] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSendOtp(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/seller/send-otp", { email: formData.email })
            if (res.data.message) {
                setOtpSent(true)
                alert(res.data.message)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to send OTP")
        } finally {
            setLoading(false)
        }
    }

    async function handleVerifyOtp(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/seller/verify-otp", { email: formData.email, otp })
            if (res.data.message) {
                alert(res.data.message)
                setEmailVerified(true)
                setOtpSent(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "OTP verification failed")
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/seller/register", formData)
            if (res.data.message) {
                alert(res.data.message)
                navigate("/login")
            }
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container auth-shell">
            <div className="auth-card w-100">
                <div className="text-center mb-4">
                    <span className="hero-kicker">Seller signup</span>
                    <h2 className="mb-2">Launch your seller account</h2>
                    <p className="section-subtitle mb-0">Verify your email, create your profile, and start listing products with a mobile-friendly form.</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Store owner name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <div className="row g-2">
                            <div className="col-12 col-md-8">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-soft rounded-pill w-100 py-2" disabled={loading} onClick={handleSendOtp}>
                                    {loading ? "Sending..." : "Send OTP"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {otpSent && (
                        <div className="mb-3">
                            <label className="form-label">Verification code</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Enter OTP to verify email"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className="btn btn-success rounded-pill w-100 py-2" onClick={handleVerifyOtp}>
                                Verify OTP
                            </button>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Create your password"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-brand rounded-pill w-100 py-2" disabled={!emailVerified || loading} onClick={handleRegister}>
                        {emailVerified ? "Create Seller Account" : "Verify email to continue"}
                    </button>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from "react"
import axios from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"

export default function BuyerRegister() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSendOtp = async (e) => {
        e.preventDefault()
        if (!formData.email) {
            return alert("Enter email first")
        }
        try {
            setLoading(true)
            const res = await axios.post("/buyer/send-otp", {
                email: formData.email
            })
            if (res.data.message) {
                alert(res.data.message)
                setOtpSent(true)
            }
        } catch (err) {
            alert(err.response?.data?.message || "OTP sending failed")
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/buyer/verify-otp", {
                email: formData.email,
                otp
            })
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

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("/buyer/register", formData)
            if (res.data.message) {
                alert(res.data.message)
                navigate("/buyer/login")
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
                    <span className="hero-kicker">Buyer signup</span>
                    <h2 className="mb-2">Create your shopping account</h2>
                    <p className="section-subtitle mb-0">Verify your email, secure your login, and start ordering in minutes.</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Full name</label>
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
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <button
                                    className="btn btn-soft rounded-pill w-100 py-2"
                                    disabled={loading}
                                    onClick={handleSendOtp}
                                >
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
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                                className="btn btn-success rounded-pill w-100 py-2"
                                disabled={loading}
                                onClick={handleVerifyOtp}
                            >
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
                            placeholder="Create a password"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="btn btn-brand rounded-pill w-100 py-2"
                        disabled={!emailVerified || loading}
                        onClick={handleRegister}
                    >
                        {emailVerified ? "Register Account" : "Verify email to continue"}
                    </button>
                </form>
            </div>
        </div>
    )
}

import React, { useState, useContext } from 'react'
import axios from '../services/axiosInstance.jsx'
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext)
  const [loginFormData, setLoginFormData] = useState({
    email: "", password: ""
  })  
  function handleLogin(e) {
    e.preventDefault();
    axios.post("/seller/login", loginFormData)
      .then((res) => {
        console.log(res)
        login(res.data)
        alert("Login Successful")
      })
      .catch(err => {
        console.log("------------",err.response)
      })
  } 
 
  function handleChange(e) {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input type="email"
            name='email'
            placeholder='Enter your Email '
            onChange={handleChange} />
        </div>
        <div>
          <input type="password"
            name='password'
            placeholder='Enter your password'
            onChange={handleChange} />
          <button>Submit</button>
        </div>

      </form>

    </div>
  )
}

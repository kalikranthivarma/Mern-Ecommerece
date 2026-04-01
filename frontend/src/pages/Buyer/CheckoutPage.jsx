import { useState } from "react"
import axios from "../../services/axiosInstance"

export default function CheckoutPage() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      const cart = await axios.get("/cart")
      let user = JSON.parse(localStorage.getItem("user"))
      const res = await axios.post("/payment/create-checkout-session", {
        items: cart.data.items,
        address,
        email: user.email
      })
      window.location.href = res.data.url
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      <textarea
        placeholder="Enter shipping address"
        value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    <br />

    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  </div>
)
}
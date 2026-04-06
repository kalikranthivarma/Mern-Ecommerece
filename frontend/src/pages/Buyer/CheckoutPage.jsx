import { useState } from "react"
import axios from "../../services/axiosInstance"

export default function CheckoutPage() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page-shell">
      <section className="hero-banner">
        <span className="hero-kicker">Checkout</span>
        <h1 className="hero-title">Finish your order with a simple, mobile-friendly payment step.</h1>
        <p className="hero-text mb-0">Enter your shipping address and continue to Stripe for secure payment.</p>
      </section>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="checkout-card p-4">
            <h2 className="mb-3">Shipping Details</h2>
            <p className="section-subtitle">Add the full delivery address you want attached to this order.</p>
            <label className="form-label">Shipping address</label>
            <textarea
              className="form-control mb-4"
              placeholder="Enter shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button className="btn btn-brand rounded-pill px-4 py-2" onClick={handleCheckout} disabled={loading || !address.trim()}>
              {loading ? "Redirecting..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

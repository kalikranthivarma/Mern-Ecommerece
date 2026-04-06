import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PaymentSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/buyer/order")
    }, 2500)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="container payment-shell">
      <div className="payment-card w-100">
        <div className="payment-icon success">OK</div>
        <h2 className="mb-2">Payment successful</h2>
        <p className="section-subtitle mb-4">Your order has been placed successfully. You will be redirected to your orders shortly.</p>
        <button className="btn btn-brand rounded-pill px-4" onClick={() => navigate("/buyer/order")}>
          View My Orders
        </button>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from "react-router-dom"

export default function PaymentCancel() {
  const navigate = useNavigate()

  return (
    <div className="container payment-shell">
      <div className="payment-card w-100">
        <div className="payment-icon cancel">!</div>
        <h2 className="mb-2">Payment cancelled</h2>
        <p className="section-subtitle mb-4">No worries. Your cart is still available, and you can return to checkout whenever you are ready.</p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <button className="btn btn-brand rounded-pill px-4" onClick={() => navigate("/buyer/cart")}>
            Back to Cart
          </button>
          <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

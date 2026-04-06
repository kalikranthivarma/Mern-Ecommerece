import React, { useEffect, useState } from "react"
import API from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"
import { getProductImageUrl } from "../../services/appConfig"

export default function CartPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)

  async function fetchCart() {
    try {
      const res = await API.get("/cart")
      setCart(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  async function updateQuantity(productId, quantity) {
    if (quantity < 1) return
    try {
      await API.put("/cart/update", {
        productId,
        quantity
      })
      fetchCart()
    } catch (err) {
      console.log(err)
    }
  }

  async function removeItem(productId) {
    try {
      await API.delete(`/cart/remove/${productId}`)
      fetchCart()
    } catch (err) {
      console.log(err)
    }
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container page-shell">
        <section className="section-card">
          <div className="empty-state">
            <h3 className="mb-2">Your cart is empty</h3>
            <p className="mb-0">Add a few products from the home page and they will appear here.</p>
          </div>
        </section>
      </div>
    )
  }

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)

  return (
    <div className="container page-shell">
      <section className="hero-banner">
        <span className="hero-kicker">Cart overview</span>
        <h1 className="hero-title">Review your items before heading to checkout.</h1>
        <p className="hero-text mb-0">Adjust quantities, remove products, and confirm your order summary from a cleaner responsive layout.</p>
      </section>
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.items.map((item) => {
            const product = item.product
            return (
              <div
                key={product._id}
                className="card product-card mb-3"
              >
                <div className="row g-0 align-items-center">
                  <div className="col-sm-4 col-md-3 text-center p-3">
                    <img
                      src={getProductImageUrl(product.images[0])}
                      className="img-fluid rounded"
                      style={{ maxHeight: "120px", objectFit: "cover" }}
                      alt={product.name}
                    />
                  </div>
                  <div className="col-sm-8 col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text mb-2 muted-text">
                        Price: <strong className="text-dark">Rs. {product.price}</strong>
                      </p>
                      <div className="d-flex flex-wrap align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            updateQuantity(product._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            updateQuantity(product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-sm-3"
                          onClick={() => removeItem(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-lg-4">
          <div className="checkout-card p-4 position-sticky" style={{ top: "6rem" }}>
            <h4 className="mb-3">Order Summary</h4>
            <p className="d-flex justify-content-between">
              <span>Total Items</span>
              <strong>{cart.items.length}</strong>
            </p>
            <p className="d-flex justify-content-between">
              <span>Total Price</span>
              <strong>Rs. {totalPrice}</strong>
            </p>
            <hr />
            <button
              className="btn btn-brand rounded-pill w-100 py-2"
              onClick={() => navigate("/buyer/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

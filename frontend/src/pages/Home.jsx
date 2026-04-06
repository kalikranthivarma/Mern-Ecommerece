import React, { useEffect, useState, useContext } from "react"
import API from "../services/axiosInstance"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getProductImageUrl } from "../services/appConfig"

export default function Home() {
  const [products, setProducts] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/all-products")
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Please login first")
      navigate("/login")
      return
    }

    if (user.role !== "buyer") {
      alert("Only buyers can add to cart")
      return
    }

    try {
      await API.post("/cart/add", {
        productId,
        quantity: 1
      })

      alert("Product added to cart")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container page-shell">
      <section className="hero-banner">
        <span className="hero-kicker">Modern storefront</span>
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="hero-title">Shop smoothly on any screen with a cleaner, faster marketplace.</h1>
            <p className="hero-text mb-0">
              Browse products, manage carts, and handle seller workflows in a layout tuned for desktop and mobile.
            </p>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <strong>{products.length}</strong>
                <div className="muted-text small">Products live right now</div>
              </div>
              <div className="hero-meta-item">
                <strong>{user ? user.role : "guest"}</strong>
                <div className="muted-text small">Current session role</div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="info-strip">
              <div className="info-strip-item">
                <div className="stat-label">Secure</div>
                <div className="fw-semibold">Token auth and protected routes</div>
              </div>
              <div className="info-strip-item">
                <div className="stat-label">Responsive</div>
                <div className="fw-semibold">Bootstrap grid across buyer and seller views</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2 className="mb-1">Featured Products</h2>
            <p className="section-subtitle mb-0">Discover what sellers have added to the marketplace.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">No products are available yet. Add products from the seller dashboard to get started.</div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div key={p._id} className="col-sm-6 col-lg-4 col-xl-3">
                <div className="card product-card">
                  {p.images?.length > 0 && (
                    <img
                      src={getProductImageUrl(p.images[0])}
                      className="product-image"
                      alt={p.name}
                    />
                  )}

                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title mb-2">{p.name}</h5>
                    <p className="card-text muted-text flex-grow-1">{p.description}</p>
                    <p className="price-tag mb-3">Rs. {p.price}</p>
                    <button
                      className="btn btn-brand mt-auto rounded-pill"
                      onClick={() => handleAddToCart(p._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

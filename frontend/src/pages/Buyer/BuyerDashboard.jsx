import React, { useEffect, useState } from "react"
import API from "../../services/axiosInstance"
import { Link } from "react-router-dom"

export default function BuyerDashboard() {
  const [orders, setOrders] = useState([])
  const [totalSpent, setTotalSpent] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders")
      const ordersData = res.data

      setOrders(ordersData)

      let spent = 0
      let items = 0

      ordersData.forEach(order => {
        spent += order.totalAmount

        order.items.forEach(item => {
          items += item.quantity
        })
      })

      setTotalSpent(spent)
      setTotalItems(items)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container page-shell">
      <section className="hero-banner">
        <span className="hero-kicker">Buyer dashboard</span>
        <h1 className="hero-title">Keep your shopping activity organized from one responsive home base.</h1>
        <p className="hero-text mb-0">Track orders, review totals, and jump quickly into the parts of the store you use most.</p>
      </section>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="dashboard-stat text-center">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{orders.length}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-stat text-center">
            <div className="stat-label">Items Purchased</div>
            <div className="stat-value">{totalItems}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-stat text-center">
            <div className="stat-label">Money Spent</div>
            <div className="stat-value">Rs. {totalSpent}</div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="action-card text-center">
            <h5>Browse Products</h5>
            <p className="muted-text">Explore available products with the updated storefront cards.</p>
            <Link to="/" className="btn btn-brand rounded-pill px-4">
              View Products
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="action-card text-center">
            <h5>My Cart</h5>
            <p className="muted-text">Check items in your cart and adjust quantities quickly.</p>
            <Link to="/buyer/cart" className="btn btn-warning rounded-pill px-4">
              Go to Cart
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="action-card text-center">
            <h5>My Orders</h5>
            <p className="muted-text">Review recent purchases and keep tabs on delivery status.</p>
            <Link to="/buyer/order" className="btn btn-success rounded-pill px-4">
              View Orders
            </Link>
          </div>
        </div>
      </div>

      <section className="table-shell">
        <div className="section-header px-2 pt-2">
          <div>
            <h4 className="mb-1">Recent Orders</h4>
            <p className="section-subtitle mb-0">A quick overview of your latest activity.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">No orders yet. Start browsing products and your purchases will show up here.</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order._id}>
                    <td className="text-break">{order._id}</td>
                    <td>{order.status}</td>
                    <td>Rs. {order.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

import { useEffect, useState } from "react"
import axios from "../../services/axiosInstance"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const res = await axios.get("/orders/my-orders")
        setOrders(res.data)
    }

    return (
        <div className="container page-shell">
            <section className="hero-banner">
                <span className="hero-kicker">Order history</span>
                <h1 className="hero-title">Track all your purchases in one place.</h1>
                <p className="hero-text mb-0">Each order is grouped into clean cards so it is easier to review from a phone or laptop.</p>
            </section>

            <section className="section-card">
                <div className="section-header">
                    <div>
                        <h2 className="mb-1">My Orders</h2>
                        <p className="section-subtitle mb-0">Review totals, status, and line items for each purchase.</p>
                    </div>
                </div>

                {orders.length === 0 && (
                    <div className="empty-state">
                        No orders found yet.
                    </div>
                )}
                {orders.map(order => (
                    <div key={order._id} className="card product-card mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                                <div>
                                    <h5 className="card-title mb-1 text-break">
                                        Order ID: {order._id}
                                    </h5>
                                    <p className="mb-0 muted-text">Placed items: {order.items.length}</p>
                                </div>
                                <span className="status-pill">
                                    {order.status}
                                </span>
                            </div>
                            <p className="fw-bold mb-3">
                                Total: Rs. {order.totalAmount}
                            </p>
                            <h6>Items</h6>
                            <ul className="list-group">
                                {order.items.map(item => (
                                    <li
                                        key={item._id}
                                        className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
                                    >
                                        <span>{item.product.name}</span>
                                        <span className="badge bg-primary rounded-pill">
                                            Qty {item.quantity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

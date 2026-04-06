import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { getProductImageUrl } from "../../services/appConfig"

const SellerDashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get("/product/my-products")
            setProducts(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <h4 className="text-center mt-5">Loading...</h4>

    return (
        <div className="container page-shell">
            <section className="hero-banner">
                <span className="hero-kicker">Seller dashboard</span>
                <h1 className="hero-title">Manage your product catalog with a polished responsive layout.</h1>
                <p className="hero-text mb-0">Review listings, scan product thumbnails, and keep your store organized from one place.</p>
            </section>

            <section className="section-card">
                <div className="section-header">
                    <div>
                        <h3 className="mb-1">My Products</h3>
                        <p className="section-subtitle mb-0">{products.length} product{products.length === 1 ? "" : "s"} in your catalog</p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="empty-state">You have not added any products yet. Use the Add Product page to publish your first listing.</div>
                ) : (
                    <div className="row g-4">
                        {products.map((product) => (
                            <div className="col-sm-6 col-xl-4" key={product._id}>
                                <div className="card product-card">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                            <div>
                                                <h5 className="mb-1">{product.name}</h5>
                                                <p className="muted-text mb-0">{product.description}</p>
                                            </div>
                                            <span className="status-pill">Rs. {product.price}</span>
                                        </div>

                                        <div className="thumb-grid">
                                            {product.images.map((imgId, index) => (
                                                <img
                                                    key={index}
                                                    src={getProductImageUrl(imgId)}
                                                    className="thumb-image"
                                                    alt="product"
                                                />
                                            ))}
                                        </div>
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

export default SellerDashboard

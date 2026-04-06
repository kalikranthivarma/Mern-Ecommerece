import { useState } from 'react'
import axios from '../../services/axiosInstance'

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: "", description: "", price: "", category: "", stock: ""
    })
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    function handleChange(e) {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleImageChange(e) {
        setImages(e.target.files)
    }

    async function handleAddProduct(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", product.name)
        formData.append("description", product.description)
        formData.append("price", Number(product.price))
        formData.append("category", product.category)
        formData.append("stock", Number(product.stock))
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i])
        }

        try {
            setLoading(true)
            const res = await axios.post("/product/add-product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            alert(res.data.message)
            setProduct({
                name: "", description: "", price: "", category: "", stock: ""
            })
            setImages([])
        } catch (err) {
            console.log("while adding product", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container page-shell">
            <section className="hero-banner">
                <span className="hero-kicker">Seller tools</span>
                <h1 className="hero-title">Add a new product with a cleaner publishing flow.</h1>
                <p className="hero-text mb-0">This form is optimized for smaller screens, stacked inputs, and image uploads that feel easier to manage.</p>
            </section>

            <section className="section-card">
                <div className="section-header">
                    <div>
                        <h2 className="mb-1">Product Details</h2>
                        <p className="section-subtitle mb-0">Fill in the fields below to publish a new item to the storefront.</p>
                    </div>
                </div>

                <form onSubmit={handleAddProduct}>
                    <div className="row g-3">
                        <div className="col-12 col-lg-6">
                            <label className="form-label">Product name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter product name'
                                name='name'
                                value={product.name}
                                onChange={handleChange} />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter product category'
                                name='category'
                                value={product.category}
                                onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Enter product description'
                                name='description'
                                value={product.description}
                                onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder='Enter product price'
                                name='price'
                                value={product.price}
                                onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder='Enter product stock'
                                name='stock'
                                value={product.stock}
                                onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Product images</label>
                            <input
                                className="form-control"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                accept='image/*' />
                        </div>
                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                        <button className="btn btn-brand rounded-pill px-4">
                            {loading ? "Uploading..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

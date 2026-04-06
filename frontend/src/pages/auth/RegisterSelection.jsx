import { Link } from "react-router-dom"

const RegisterSelection = () => {
    return (
        <div className="container selection-shell">
            <div className="selection-card w-100">
                <div className="text-center mb-4">
                    <span className="hero-kicker">Get started</span>
                    <h2 className="mb-2">Create your account</h2>
                    <p className="section-subtitle mb-0">Join as a seller to list products or as a buyer to start shopping.</p>
                </div>
                <div className="selection-grid">
                    <div className="selection-option">
                        <h5>Seller Registration</h5>
                        <p className="mb-3">Build your storefront, add product details, and reach new customers.</p>
                        <Link to="/seller/register" className="btn btn-brand rounded-pill px-4">
                            Register as Seller
                        </Link>
                    </div>
                    <div className="selection-option">
                        <h5>Buyer Registration</h5>
                        <p className="mb-3">Create a shopper profile and move smoothly from browsing to checkout.</p>
                        <Link to="/buyer/register" className="btn btn-success rounded-pill px-4">
                            Register as Buyer
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterSelection

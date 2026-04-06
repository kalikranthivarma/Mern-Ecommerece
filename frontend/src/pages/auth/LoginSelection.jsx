import { Link } from "react-router-dom"

const LoginSelection = () => {
    return (
        <div className="container selection-shell">
            <div className="selection-card w-100">
                <div className="text-center mb-4">
                    <span className="hero-kicker">Choose your path</span>
                    <h2 className="mb-2">Login to your workspace</h2>
                    <p className="section-subtitle mb-0">Pick the experience that matches how you use the platform.</p>
                </div>
                <div className="selection-grid">
                    <div className="selection-option">
                        <h5>Seller Login</h5>
                        <p className="mb-3">Manage inventory, upload products, and monitor your catalog.</p>
                        <Link to="/seller/login" className="btn btn-brand rounded-pill px-4">
                            Continue as Seller
                        </Link>
                    </div>
                    <div className="selection-option">
                        <h5>Buyer Login</h5>
                        <p className="mb-3">Access your cart, view orders, and checkout faster on every device.</p>
                        <Link to="/buyer/login" className="btn btn-success rounded-pill px-4">
                            Continue as Buyer
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginSelection

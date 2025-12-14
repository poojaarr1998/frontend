import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productReducer";
import { createOrder, clearOrderMessage } from "../store/action/orderAction";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

const OrderForm = () => {
    const dispatch = useDispatch();
    const { items: products, loading: productsLoading } = useSelector(state => state.products);
    const { loading, successMessage, error } = useSelector(state => state.order);
    const [selectedProducts, setSelectedProducts] = React.useState({});
    const [shippingAddress, setShippingAddress] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("COD");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearOrderMessage());
        }
        if (error) {
            toast.error(error);
            dispatch(clearOrderMessage());
        }
    }, [successMessage, error, dispatch]);

    const handleQuantityChange = (id, qty) => {
        setSelectedProducts({ ...selectedProducts, [id]: Number(qty) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderProducts = Object.entries(selectedProducts)
            .filter(([id, qty]) => qty > 0)
            .map(([id, qty]) => {
                const product = products.find(p => p.id === parseInt(id));
                return {
                    ...product,
                    quantity: qty
                };
            });

        if (!orderProducts.length) return toast.warn("Select at least one product");

        dispatch(createOrder({
            products: orderProducts,
            shippingAddress,
            paymentMethod
        }));
        setSelectedProducts({});
        setShippingAddress("");
        setPaymentMethod("");
    };

    const displayProducts = products.slice(0, 5);

    return (
        <div className="order-form-container">
            <h2>Create New Order</h2>

            {productsLoading ? <p>Loading products...</p> : (
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="products-grid">
                        {displayProducts.map(p => {
                            const isSelected = selectedProducts[p.id] > 0;

                            const handleCardClick = () => {
                                if (isSelected) {
                                    setSelectedProducts({ ...selectedProducts, [p.id]: 0 });
                                } else {
                                    setSelectedProducts({ ...selectedProducts, [p.id]: 1 });
                                }
                            };

                            return (
                                <div
                                    key={p.id}
                                    className={`product-card ${isSelected ? "selected" : ""}`}
                                    style={{
                                        border: isSelected ? "2px solid #1890ff" : "1px solid #ccc",
                                        backgroundColor: isSelected ? "#e6f7ff" : "#fff",
                                        cursor: "pointer"
                                    }}
                                    onClick={handleCardClick}
                                >
                                    <div className="product-info">
                                        <h3>{p.name}</h3>
                                        <p>₹{p.price}</p>
                                        <input
                                            type="number"
                                            min="0"
                                            value={selectedProducts[p.id] || 0}
                                            onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="form-group">
                        <label>Shipping Address</label>
                        <textarea
                            placeholder="Enter shipping address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select value={paymentMethod} disabled={true} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="COD">Cash on Delivery</option>

                        </select>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </form>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default OrderForm;

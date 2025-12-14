import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderList } from "../store/action/orderAction";
import './login.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrderList(1, 1));
    }, [dispatch]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">


        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2 className="dashboard-title">Total Orders</h2>
                <p><strong>Total Orders:</strong> {orders.length || 0}</p>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;

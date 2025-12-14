import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/privateRoutes";
import PublicRoute from "./components/publicRoutes";
import Profile from "./pages/Profile";
import OrderForm from "./pages/OrderForm";
import OrderList from "./pages/OrderList";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-order"
                    element={
                        <PrivateRoute>
                            <OrderForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/order-list"
                    element={
                        <PrivateRoute>
                            <OrderList />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/action/authActions.js";
import { Form, Input, Button, Alert } from "antd";
import './login.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const onFinish = async (values) => {
        try {
            const msg = await dispatch(loginUser(values));
            toast.success(msg);
        } catch (errMsg) {
            toast.error(errMsg);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
            <div className="card p-4 shadow-sm login-card">
                <h2 className="text-center mb-4">Login</h2>

                {error && <Alert message={error} type="error" showIcon className="mb-3" />}
                <Form name="login" layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className="btn-gradient"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default Login;

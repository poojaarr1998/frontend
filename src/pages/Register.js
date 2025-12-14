import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/action/authActions.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const msg = await dispatch(registerUser(values));
            toast.success(msg);
        } catch (errMsg) {
            toast.error(errMsg);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Register</h2>

                {error && <Alert type="error" message={error} className="register-alert" />}

                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-gradient" loading={loading} block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;

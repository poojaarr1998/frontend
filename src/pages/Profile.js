import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import {fetchProfile, loginUser, updateProfile} from "../store/action/authActions";
import { toast } from "react-toastify";
const Profile = () => {
    const dispatch = useDispatch();
    const { loading ,user} = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, form]);


    const onFinish = async (values) => {
        try {
            const msg = await dispatch(updateProfile(values));
            toast.success(msg);
        } catch (errMsg) {
            toast.error(errMsg);
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <Card title="My Profile" style={{ width: 400 }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Enter a valid email" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Button type="primary" htmlType="submit"    className="btn-gradient" block>
                            Update Profile
                        </Button>
                    </Form>
                )}
            </Card>
        </div>
    );
};

export default Profile;

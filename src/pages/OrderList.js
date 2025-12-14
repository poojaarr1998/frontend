import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList, cancelOrder } from "../store/action/orderAction";
import {
    Table,
    Tag,
    Spin,
    Modal,
    Button,
    Popconfirm,
} from "antd";
import { toast } from "react-toastify";

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, loading, page, totalPages } = useSelector((state) => state.order);

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(fetchOrderList(currentPage));
    }, [dispatch, currentPage]);

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const msg = await dispatch(cancelOrder(orderId));
            toast.success(msg);
            dispatch(fetchOrderList(currentPage));
        } catch (error) {
            toast.error(error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            render: (products) => (
                <ul style={{ paddingLeft: 16 }}>
                    {products.map((p) => (
                        <li key={p.id}>
                            {p.name} × {p.quantity}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (amount) => `₹${amount}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const color =
                    status === "Confirmed"
                        ? "orange"
                        : status === "Completed"
                        ? "green"
                        : status === "Cancelled"
                            ? "red"
                            : "default";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => openModal(record)}>
                        View
                    </Button>

                    {record.status === "Confirmed" && (
                        <Popconfirm
                            title="Are you sure you want to cancel this order?"
                            onConfirm={() => handleCancelOrder(record.orderId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link" danger>
                                Cancel
                            </Button>
                        </Popconfirm>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="container" style={{ padding: 20 }}>
            <h2>My Orders</h2>

            {loading ? (
                <Spin />
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey="orderId"
                        pagination={{
                            current: currentPage,
                            total: totalPages * 5, // Assuming 5 orders per page
                            pageSize: 5,
                            onChange: handlePageChange,
                        }}
                    />
                </>
            )}

            <Modal
                title="Order Details"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={600}
            >
                {selectedOrder && (
                    <>
                        <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
                        <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

                        <h4>Products</h4>
                        <ul>
                            {selectedOrder.products.map((p) => (
                                <li key={p.id}>
                                    {p.name} × {p.quantity} — ₹{p.price * p.quantity}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default OrderList;

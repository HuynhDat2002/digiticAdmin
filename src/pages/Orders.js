import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { updateOrderStatus } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrder(orderState[i]?._id, e.target.value)} className="form-control form-select" id="">
            <option
              value="Not Processed" disabled selected>Not Processed</option>
            <option
              value="Cash on Delivery">  Cash on Delivery</option>
            <option value="Processing"> Processing</option>
            <option
              value="Dispatched"> Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>

          </select>
        </>
      ),
    });
  }

  const updateOrder = (id, value) => {
    console.log("id", id);
    console.log("value", value);
    dispatch(updateOrderStatus({ id: id, value: value }))
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;

import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
import { updateOrderStatus } from "../features/auth/authSlice";
import { NumericFormat } from "react-number-format";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Sản Phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng cộng",
    dataIndex: "amount",
  },
  {
    title: "Ngày mua",
    dataIndex: "date",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
const auth = useSelector(state=>state.auth.user)
 const config2 =(auth)=> {
    return{
  
      headers: {
        Authorization: `Bearer ${
          auth !== null ? auth.token : ""
        }`,
        Accept: "application/json",
      }
    }
  
    
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.name ,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          Xem chi tiết
        </Link>
      ),
      amount: <NumericFormat value=  { orderState[i]?.totalPrice} allowLeadingZeros thousandSeparator="," suffix=" VND"></NumericFormat>,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)} className="form-control form-select" id="">
            <option value="Ordered" disabled selected>Đã đặt hàng</option>       
            <option value="Processing"> Đang xử lý</option>
            <option value="Dispatched"> Đã gửi</option>     
            <option value="Cancelled">Đã hủy</option>
            <option value="Delivered">Đã giao hàng</option>

          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (id, value) => {
    
    dispatch(updateAOrder({ id: id, status: value }))
  }


  return (
    <div>
      <h3 className="mb-4 title">Đơn đặt hàng</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;

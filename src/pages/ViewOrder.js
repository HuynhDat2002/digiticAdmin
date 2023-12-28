import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";
import { NumericFormat } from "react-number-format";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Hãng",
    dataIndex: "brand",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    render: (text, record) => (
      <div style={{ backgroundColor: text, width: '20px', height: '20px' }} className="rounded-5"></div>
    ),
  },
  {
    title: "Tổng cộng",
    dataIndex: "amount",
  }
 

  
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.productId.title,
      brand: orderState?.orderItems[i]?.productId.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount: <NumericFormat value=  { orderState?.orderItems[i]?.productId.price} allowLeadingZeros thousandSeparator="," suffix=" VND"></NumericFormat>,
      
     // color :<div style = {{backgroundColor:orderState?.orderItems[i]?.color?.title}}></div>
      color: orderState?.orderItems[i]?.color?.title,
     
    
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Xem hóa đơn</h3>
      <div>
        <Table columns={columns} dataSource={data1}  />
      </div>
    </div>
  );
};

export default ViewOrder;

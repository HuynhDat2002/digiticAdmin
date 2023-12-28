import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from "../features/auth/authSlice";
import { NumericFormat } from "react-number-format";
import {config3} from '../utils/axiosconfig'
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng cộng",
    dataIndex: "price",
  },
  {
    title: "Sau khi giảm giá",
    dataIndex: "dprice",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];


const Dashboard = () => {
  const dispatch  = useDispatch();
  const auth = useSelector(state=>state?.auth?.user)
  const monthlyDataState = useSelector(state => state?.auth?.monthlyData)
  const yearlyDataState = useSelector(state => state?.auth?.yearlyData);
  const orderState = useSelector(state => state?.auth?.orders.orders)
  const [dataMonthly,setDataMonthly] = useState([])
  const [dataMonthlySales,setDataMonthlySales] = useState([])
  const [orderData,setOrderData]=useState([])
  useEffect(() => {

    dispatch(getMonthlyData())
    dispatch(getYearlyData())
    dispatch(getOrders())
  }, [])

  useEffect(() => {
   
    let monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let data =[]
    let monthlyOrderCount=[]
    for(let index = 0;index < monthlyDataState?.length; index++){
      const element = monthlyDataState[index];
      data.push({type:monthNames[element?._id?.month],income:element?.amount})
      monthlyOrderCount.push({type:monthNames[element?._id?.month],sales:element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i+1,
        name: orderState[i]?.shippingInfo?.name ,
        product: orderState[i].orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1)


  }, [orderState])

  const config = {
    data :dataMonthly,
    xField: "income",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data :dataMonthlySales,
    xField: "sales",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  console.log("t",yearlyDataState)
  return (  
    <div>
      <h3 className="mb-4 title">Trang chủ</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Doanh thu</p>
            <h4 className="mb-0 sub-title  fw-bold"><NumericFormat value={yearlyDataState && yearlyDataState[0].amount} className="mx-0 px-0 fw-bold border border-0" allowLeadingZeros thousandSeparator="," suffix=" VND"/></h4>
          </div>  
          <div className="d-flex flex-column align-items-end">

            <p className="mb-0  desc">Doanh thu so với năm trước</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Số đơn hàng</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0].count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0 desc">Số đơn hàng so với năm trước</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3 mt-5">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 flex-grow-1 w-50" >
        <h3 className="mb-5 title">Thống kê bán hàng</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
    </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Đơn hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

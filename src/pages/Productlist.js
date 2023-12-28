import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link,useNavigate } from "react-router-dom";
import {deleteProduct,resetState} from '../features/product/productSlice'
import { toast } from "react-toastify";
import axios from "axios";
import ProductEdit from '../components/ProductEdit'
import CustomModal from "../components/CustomModal";




const Productlist = () => {
  axios.defaults.withCredentials=true;
  const [openDelete, setOpenDelete] = useState(false);
  const [proId,setProId] = useState("");
  const showModal = (e) => {
    setOpenDelete(true);
    setProId(e);
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataProd,setDataProd] = useState();
  const dispatch = useDispatch();
  
  const data1 = [];
  useEffect(()=>{
    dispatch(getProducts());

  },[]);
  const productCheck=useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, message } =productCheck ;
  

  const navigate = useNavigate();
 
  
  const productState = useSelector((state) => state.product.products);
  useEffect(() => {
    if (isSuccess && message === "deleted") {
      toast.success("Đã xóa sản phẩm thành công");
      setTimeout(() => {
        if(!isLoading)  dispatch(getProducts());
      }, 1000);

      // Replace "/" with the desired path
    }
    if (isError) {
      toast.error("Lỗi!");
    }
  }, [isSuccess,message]);
  const handleEdit = (data)=>{
    setIsEditOpen(true)
    setDataProd(data);

        
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Màu",
      dataIndex: "color",
      render: (text, record) => (
        <div style={{ backgroundColor: text, width: '20px', height: '20px' }} className="rounded-5"></div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Trạng thái",
      dataIndex: "action",
    },
  ];
  for (let i = 0; i < productState.length; i++) {
    console.log("product ",i," : ",productState[i]);
    let colorStore=[]
    productState[i].color.forEach((element) => colorStore.push(element.title));
    console.log("colorStore: ",colorStore)
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: colorStore,
      price: `${productState[i].price}`,
      quantity:productState[i].quantity,
      action: (
        <>
          <Link to = {`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link  className=" fs-3 text-ms-3 fs-3 text-danger" onClick={()=>showModal(productState[i]._id)}>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  
  const deleteAProduct = (e) => {
    dispatch(deleteProduct(e));

    setOpenDelete(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  console.log("data1:",data1);
  return (
    <>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div className="z-0">
         <Table columns={columns} dataSource={data1} /> 
      </div>
      <CustomModal
        hideModal={()=>setOpenDelete(false)}
        open={openDelete}
        performAction={() => {
          deleteAProduct(proId);
        }}
        title="Bạn muốn xóa sản phẩm này không?"
      />
    </>
  );
};

export default Productlist;

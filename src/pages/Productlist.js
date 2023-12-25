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
      toast.success("Product Deleted Successfullly!");
      setTimeout(() => {
        if(!isLoading)  dispatch(getProducts());
      }, 1000);

      // Replace "/" with the desired path
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess,message]);
  const handleEdit = (data)=>{
    setIsEditOpen(true)
    setDataProd(data);

        
  }

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Action",
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
      <h3 className="mb-4 title">Products</h3>
      <div className="z-0">
         <Table columns={columns} dataSource={data1} /> 
      </div>
      <CustomModal
        hideModal={()=>setOpenDelete(false)}
        open={openDelete}
        performAction={() => {
          deleteAProduct(proId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </>
  );
};

export default Productlist;

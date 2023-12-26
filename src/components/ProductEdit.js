import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { editUser } from "../features/auth/authSlice";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import CustomButton from './CustomButton';
import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { updateProduct, resetState, getProducts, getAProduct } from "../features/product/productSlice";
import axios from 'axios';


const ProductEdit = () => {
    axios.defaults.withCredentials = true;

    let schema = yup.object().shape({
        title: yup.string().required(" Không được để trống"),
        description: yup.string().required(" Không được để trống"),
        price: yup.number().required(" Không được để trống"),
        category: yup.string().required(" Không được để trống"),
        tags: yup.string().required(" Không được để trống"),
        color: yup
            .array()
            .required(" Không được để trống"),
        quantity: yup.number().required(" Không được để trống"),
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getProdId = location.pathname.split("/")[3];
    console.log("prodid: ",getProdId);
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);

    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getAProduct(getProdId));
    }, []);
    useEffect(() => {
        if (getProdId !== undefined) {
            dispatch(getAProduct(getProdId));
        } else {
            dispatch(resetState());
        }
    }, [getProdId]);
            const { isSuccess, isError, isLoading, createdProduct, updatedProduct, product } = newProduct;
            const [data,setData] = useState(product)
    console.log("pro",product)
    useEffect(() => {

        if (isSuccess && updatedProduct) {
            toast.success("Cập nhật sản phẩm thành công");
            
            navigate("/admin/list-product");
        }
        if (isError) {
            toast.error("Lỗi");
        }
    }, [isSuccess, isError, isLoading]);
    const colorProd = []
    data?.color?.forEach((e) => colorProd.push({ label: e.title, value: e._id }))
    console.log("colorProd: ", colorProd);
    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });
    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    if(getProdId){
        data?.images?.forEach((i) => {
          img.push({
          public_id: i.public_id,
          url: i.url,
          });
      });
      }
    data?.images?.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img,imgState]);

    console.log("uploadimg: ", imgState);
    console.log("dataedit: ", data);
    console.log("coloredit: ", color);
    const formik = useFormik({
        initialValues: {
            title:  product?.title || "",
            description:  product?.description|| "",
            price:  product?.price || "",
            brand:  product?.brand || "",
            category:  product?.category || "",
            tags:  product?.tags|| "",
            color: colorProd.filter((e) => e.value)|| "",
            quantity:  product?.quantity || "",
            images:  product?.images || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(updateProduct({ productData: values, id: getProdId }));
           dispatch(resetState());
        },
    });
 
    const handleColors = (i) => {
        // colorProd.filter((e)=>i.push(e.value))
        if (!i) {
            setColor(formik.values.color);
        }
        else {

            setColor(i);
        }
        console.log(color);
    };

    const handleDeleteImageUpload = (i) => {

        imgState = imgState.filter(item => item.public_id !== i.public_id)
        dispatch(delImg(i.public_id))
    }
    const handleDeleteImage = (i) => {
        setData((prev) => ({
            ...prev,
            images: product.images.filter(item => item.public_id !== i.public_id)
        }))
    }
    return (
            <div>
                <h3 className="mb-4 title">Chỉnh sửa</h3>
                <div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="d-flex gap-3 flex-column"
                    >
                        <CustomInput
                            type="text"
                            label="Nhập tên sản phẩm"
                            name="title"
                            onChng={formik.handleChange("title")}
                            onBlr={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                        <div className="">
                            <ReactQuill
                                theme="snow"
                                name="description"
                                onChange={formik.handleChange("description")}
                                value={formik.values.description}
                            />
                        </div>
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>
                        <CustomInput
                            type="number"
                            label="Nhập giá sản phẩm "
                            name="price"
                            onChng={formik.handleChange("price")}
                            onBlr={formik.handleBlur("price")}
                            val={formik.values.price}
                        />
                        <div className="error">
                            {formik.touched.price && formik.errors.price}
                        </div>
                        <select
                            name="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="">Chọn hãng</option>
                            {brandState.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.brand && formik.errors.brand}
                        </div>
                        <select
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            {catState.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.category && formik.errors.category}
                        </div>
                        <select
                            name="tags"
                            onChange={formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                            value={formik.values.tags}
                            className="form-control py-3 mb-3"
                            id=""
                        >
                            <option value="" disabled>
                                Tags
                            </option>
                            <option value="featured">Sản phẩm bán chạy</option>
                            <option value="popular">Sản phẩm nổi tiếng</option>
                            <option value="special">Sản phẩm đặc biệt</option>
                        </select>
                        <div className="error">
                            {formik.touched.tags && formik.errors.tags}
                        </div>

                        <Select
                            mode="multiple"
                            allowClear
                            className="w-100"
                            placeholder="Chọn màu"
                            defaultValue={colorProd.filter((e) => e.label)}
                            onChange={(i) => handleColors(i)}
                            options={coloropt}
                        />
                        <div className="error">
                            {formik.touched.color && formik.errors.color}
                        </div>
                        <CustomInput
                            type="number"
                            label="Nhập số lượng sản phẩm"
                            name="quantity"
                            onChng={formik.handleChange("quantity")}
                            onBlr={formik.handleBlur("quantity")}
                            val={formik.values.quantity}
                        />
                        <div className="error">
                            {formik.touched.quantity && formik.errors.quantity}
                        </div>
                        <div className="bg-white border-1 p-4 text-center d-flex justify-content-center align-items-center">
                            <Dropzone
                                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p >
                                                Kéo thả file ở đây hoặc click để chọn file
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                        <div className="showimages d-flex flex-wrap gap-3">
                            {data?.images?.map((i, j) => {
                                return (
                                    <div className=" position-relative" key={j}>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(i)}
                                            className="btn-close position-absolute"
                                            style={{ top: "10px", right: "10px" }}
                                        ></button>
                                        <img src={i.url} alt="" width={200} height={200} />
                                    </div>
                                );
                            })}
                            {imgState?.map((i, j) => {
                                return (
                                    <div className=" position-relative" key={j}>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImageUpload(i)}
                                            className="btn-close position-absolute"
                                            style={{ top: "10px", right: "10px" }}
                                        ></button>
                                        <img src={i.url} alt="" width={200} height={200} />
                                    </div>
                                );
                            })}
                        </div>
                        <CustomButton title="Sửa" type="submit" />
                    </form>
                </div>
            </div>
    )
}

export default ProductEdit
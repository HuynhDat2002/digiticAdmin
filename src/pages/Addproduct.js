import CustomButton from "../components/CustomButton";
import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Color from "../components/Color";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Không được bỏ trống"),
  description: yup.string().required("Không được bỏ trống"),
  price: yup.number().required("Không được bỏ trống"),
  brand: yup.string().required("Không được bỏ trống"),
  category: yup.string().required("Không được bỏ trống"),
  tags: yup.string().required("Không được bỏ trống"),
  color: yup
    .array()
    .min(1, "Chọn ít nhất 1 màu")
    .required("Không được bỏ trống"),
  quantity: yup.number().required("Không được bỏ trống"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  console.log(color);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  console.log("NPRO", newProduct);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Thêm sản phẩm thành công");
    }
    if (isError) {
      toast.error("Gặp lỗi");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  let img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className="mb-4 title">Thêm sản phẩm</h3>
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
            label="Nhập giá sản phẩm"
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
              Chọn kiểu sản phẩm
            </option>
            <option value="featured">Bán chạy</option>
            <option value="popular">Nổi tiếng</option>
            <option value="special">Đặc biệt</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          {/* <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn màu"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          /> */}
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn màu"
            value={color}
            onChange={(i) => handleColors(i)}
            optionLabelProp="title"
          >
            {
              coloropt.map(item =>
                <Select.Option key={item.value} value={item.value} title={<span style={{backgroundColor:item.label}}>{item.label}</span>}>
                  <span style={{backgroundColor:item.label}}>{item.label}</span>
                </Select.Option>
              )
            }
          </Select>
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
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Kéo thả file vào đây hoặc click để chọn file</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <CustomButton title="Thêm sản phẩm" />
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

// import { React, useEffect, useState } from "react";
// import CustomInput from "../components/CustomInput";
// import CustomButton from "../components/CustomButton"
// import ReactQuill from "react-quill";
// import { useNavigate,useLocation } from "react-router-dom";
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { getBrands } from "../features/brand/brandSlice";
// import { getCategories } from "../features/pcategory/pcategorySlice";
// import { getColors } from "../features/color/colorSlice";
// import { Select } from "antd";
// import Dropzone from "react-dropzone";
// import { delImg, uploadImg } from "../features/upload/uploadSlice";
// import { createProducts, resetState } from "../features/product/productSlice";
// import axios from 'axios'
// let schema = yup.object().shape({
//   title: yup.string().required("Title is Required"),
//   description: yup.string().required("Description is Required"),
//   price: yup.number().required("Price is Required"),
//   brand: yup.string().required("Brand is Required"),
//   category: yup.string().required("Category is Required"),
//   tags: yup.string().required("Tag is Required"),
//   color: yup
//     .array()
//     .min(1, "Pick at least one color")
//     .required("Color is Required"),
//   quantity: yup.number().required("Quantity is Required"),
// });

// const Addproduct = () => {
//   axios.defaults.withCredentials=true;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [color, setColor] = useState([]);
//   const [images, setImages] = useState([]);

//   const brandState = useSelector((state) => state.brand.brands);
//   const catState = useSelector((state) => state.pCategory.pCategories);
//   const colorState = useSelector((state) => state.color.colors);

//   const imgState = useSelector((state) => state.upload.images);
//   const newProduct = useSelector((state) => state.product);
//   const { isSuccess, isError, isLoading, createdProduct} = newProduct;
//   useEffect(()=>{

//     dispatch(getCategories());
//     dispatch(getBrands());
//     dispatch(getColors());
//   },[isSuccess, isError, isLoading])

//     useEffect(() => {
//       if (isSuccess && createdProduct) {
//         toast.success("Product Added Successfullly!");
//       }
//       if (isError) {
//         toast.error("Something Went Wrong!");
//       }
//     }, [isSuccess, isError, isLoading]);

//   const coloropt = [];
//   colorState.forEach((i) => {
//     coloropt.push({
//       label: i.title,
//       value: i._id,
//     });
//   });
//   const img = [];
//   imgState.forEach((i) => {
//     img.push({
//       public_id: i.public_id,
//       url: i.url,
//     });
//   });

//   console.log("img: ", imgState);
//   useEffect(() => {
//     formik.values.color = color ? color : " ";
//     formik.values.images = img;
//   }, [color, img]);
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       price: "",
//       brand: "",
//       category: "",
//       tags: "",
//       color: "",
//       quantity: "",
//       images: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       dispatch(createProducts(values));
//       formik.resetForm();
//       setColor(null);
//       setTimeout(() => {
//         dispatch(resetState());
//       }, 300);
//     },
//   });
//   const handleColors = (e) => {
//     setColor(e);
//   };

//   const handleDeleteImage = (i) => {
//     // setImages(images.filter(item => item.asset_id !== i.asset_id));
//   }
//   return (
//     <div>
//       <h3 className="mb-4 title">Add Product</h3>
//       <div>
//         <form
//           onSubmit={formik.handleSubmit}
//           className="d-flex gap-3 flex-column"
//         >
//           <CustomInput
//             type="text"
//             label="Enter Product Title"
//             name="title"
//             onChng={formik.handleChange("title")}
//             onBlr={formik.handleBlur("title")}
//             val={formik.values.title}
//           />
//           <div className="error">
//             {formik.touched.title && formik.errors.title}
//           </div>
//           <div className="">
//             <ReactQuill
//               theme="snow"
//               name="description"
//               onChange={formik.handleChange("description")}
//               value={formik.values.description}
//             />
//           </div>
//           <div className="error">
//             {formik.touched.description && formik.errors.description}
//           </div>
//           <CustomInput
//             type="number"
//             label="Enter Product Price"
//             name="price"
//             onChng={formik.handleChange("price")}
//             onBlr={formik.handleBlur("price")}
//             val={formik.values.price}
//           />
//           <div className="error">
//             {formik.touched.price && formik.errors.price}
//           </div>
//           <select
//             name="brand"
//             onChange={formik.handleChange("brand")}
//             onBlur={formik.handleBlur("brand")}
//             value={formik.values.brand}
//             className="form-control py-3 mb-3"
//             id=""
//           >
//             <option value="">Select Brand</option>
//             {brandState.map((i, j) => {
//               return (
//                 <option key={j} value={i.title}>
//                   {i.title}
//                 </option>
//               );
//             })}
//           </select>
//           <div className="error">
//             {formik.touched.brand && formik.errors.brand}
//           </div>
//           <select
//             name="category"
//             onChange={formik.handleChange("category")}
//             onBlur={formik.handleBlur("category")}
//             value={formik.values.category}
//             className="form-control py-3 mb-3"
//             id=""
//           >
//             <option value="">Select Category</option>
//             {catState.map((i, j) => {
//               return (
//                 <option key={j} value={i.title}>
//                   {i.title}
//                 </option>
//               );
//             })}
//           </select>
//           <div className="error">
//             {formik.touched.category && formik.errors.category}
//           </div>
//           <select
//             name="tags"
//             onChange={formik.handleChange("tags")}
//             onBlur={formik.handleBlur("tags")}
//             value={formik.values.tags}
//             className="form-control py-3 mb-3"
//             id=""
//           >
//             <option value="" disabled>
//               Select Tag
//             </option>
//             <option value="featured">Featured</option>
//             <option value="popular">Popular</option>
//             <option value="special">Special</option>
//           </select>
//           <div className="error">
//             {formik.touched.tags && formik.errors.tags}
//           </div>

//           <Select
//             mode="multiple"
//             allowClear
//             className="w-100"
//             placeholder="Select colors"
//             defaultValue={color}
//             onChange={(i) => handleColors(i)}
//             options={coloropt}
//           />
//           <div className="error">
//             {formik.touched.color && formik.errors.color}
//           </div>
//           <CustomInput
//             type="number"
//             label="Enter Product Quantity"
//             name="quantity"
//             onChng={formik.handleChange("quantity")}
//             onBlr={formik.handleBlur("quantity")}
//             val={formik.values.quantity}
//           />
//           <div className="error">
//             {formik.touched.quantity && formik.errors.quantity}
//           </div>
//           <div className="bg-white border-1 p-5 text-center">
//             <Dropzone
//               onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
//             >
//               {({ getRootProps, getInputProps }) => (
//                 <section>
//                   <div {...getRootProps()}>
//                     <input {...getInputProps()} />
//                     <p>
//                       Drag 'n' drop some files here, or click to select files
//                     </p>
//                   </div>
//                 </section>
//               )}
//             </Dropzone>
//           </div>
//           <div className="showimages d-flex flex-wrap gap-3">
//             {imgState?.map((i, j) => {
//               return (
//                 <div className=" position-relative" key={j}>
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteImage(i)}
//                     className="btn-close position-absolute"
//                     style={{ top: "10px", right: "10px" }}
//                   ></button>
//                   <img src={i.url} alt="" width={200} height={200} />
//                 </div>
//               );
//             })}
//           </div>
//         <CustomButton title ="Add Product" type="submit"/>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addproduct;

import React, { useEffect,useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from '../components/CustomButton'
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import axios from "axios";


const Login = () => {
  axios.defaults.withCredentials=true;

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Không được bỏ trống")
      .required("Không được bỏ trống"),
    password: yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => { 
      console.log("value login: ",values)
      dispatch(login(values));
    },
  });
  
  const authState = useSelector((state) => state.auth);
  const { user, isError, isSuccess, isLoading, message } = authState
  const userData = JSON.parse(localStorage.getItem('user'));
  console.log("userLogin: ",userData);
  useEffect(()=>{
    if(user.token && message==="loggedin")
    navigate('/admin')

    
},[authState])
  console.log('n')
  return (
    <div className="position-relative py-5 bg-ffd333 min-vh-100">
      <div className=" position-fixed top-50 start-50 translate-middle my-auto w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Đăng nhập</h3>
        <p className="text-center">Đăng nhập để tiếp tục.</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email "
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Mật khẩu"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="" >
             Quên mật khẩu ?
            </Link>
          </div>
          <CustomButton
            title="Đăng nhập"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

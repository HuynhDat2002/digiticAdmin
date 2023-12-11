import React, { useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {useDispatch,useSelector} from "react-redux";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import CustomButton from  "../components/CustomButton";
import {forgotPassword} from '../features/auth/authSlice'


const ForgotPassword = () => {
  axios.defaults.withCredentials=true;
  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("email: ",values)
      dispatch(forgotPassword(values));
    },
  });
  
  // const authState = useSelector((state) => state);
  // const { user, isError, isSuccess, isLoading, message } = authState.auth;
  return (
    <div className="position-relative py-5 bg-ffd333 min-vh-100">
      <div className="position-fixed top-50 start-50 translate-middle my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput  
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />

          <CustomButton 
            title="Send Link"
          />
          {/* <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

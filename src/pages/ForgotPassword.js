import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { forgotPassword } from '../features/auth/authSlice'


const ForgotPassword = () => {
  axios.defaults.withCredentials = true;
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
      console.log("email: ", values)
      dispatch(forgotPassword(values));
    },
  });


  const authState = useSelector((state) => state);
  const {  message } = authState.auth;
  const tokenPassword = localStorage.getItem("tokenPassword")
  // useEffect(() => {
  //   console.log('forgot password')
  //   console.log(tokenPassword)
  //   if (tokenPassword!== null) {
  //     navigate("/");
  //   }
  // }, [isSuccess]);
  console.log("message: ",message)
  return (
    <div className="position-relative py-5 bg-ffd333 min-vh-100">
      <div className="position-fixed top-50 start-50 translate-middle my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="" onSubmit={formik.handleSubmit}>
          {message && message.message}
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Link to="/" className="d-flex mb-3 justify-content-end" onClick={localStorage.removeItem('tokenPassword')}>
              Login
            </Link>
            {tokenPassword !== null && (
              <button type="submit" className="mb-3 border border-0 bg-transparent text-primary text-decoration-underline justify-content-start">
                Resend
              </button>
            )}
          </div>
          <CustomButton
            title="Send Link"
          />

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

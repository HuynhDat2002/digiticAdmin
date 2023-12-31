import React, { useEffect } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetPassword } from '../features/auth/authSlice'


const ResetPassword = () => {

  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useParams();

  
  console.log('token: ', token  );
  let schema = yup.object().shape({

    password: yup.string().required("Password is Required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),

  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      token:token
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("values: ",values);
      dispatch(resetPassword(values));
    },
  });
  const authState = useSelector((state) => state);
  const { isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("/",{relative:"path"});
    }
  }, [isSuccess]);

  return (
    <div className="position-relative py-5 bg-ffd333 min-vh-100">
      <div className="position-fixed top-50 start-50 translate-middle my-auto w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="" onSubmit={formik.handleSubmit}>
          {message&&(message.message||message)}
          
          <CustomInput
            type="password"
            label="Password"
            id="password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChng={formik.handleChange("confirmPassword")}
            onBlr={formik.handleBlur("confirmPassword")}
            val={formik.values.confirmPassword}
          />
          <div className="error mt-2">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
            {formik.touched.confirmPassword && formik.values.confirmPassword === formik.values.password && (
              <div className="text-success">Password matched</div>
            )}

          </div>
          <CustomButton
            title="Reset Password"
          />

        </form>
      
      </div>
    </div>
  );
};

export default ResetPassword;

import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { editUser } from "../features/auth/authSlice";
import * as yup from "yup";
import CustomButton from '../components/CustomButton';
// import authService from '../features/auth/authServices';

const ProfileEdit = ({ isOpen, closeModal }) => {
    const userData=JSON.parse(localStorage.getItem('user'));


    let validationSchema = () => {
        yup.object().shape({
            firstname: yup.string().required("Firstname is Required"),
            lastname: yup.string().required("Lastname is Required"),
            email: yup
                .string()
                .email("Email should be valid")
                .required("Email is Required"),
            password: yup.string().required("Password is Required"),
            mobile: yup.string().required("Mobile is Required"),
            address: yup.string().required("Address is Required"),
        });
    }



    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            mobile: userData.mobile,
            address: userData.address

        },
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            console.log("value edit: ", values)
            dispatch(editUser(values))
            closeModal()
        },
    });

    return (

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='position-relative z-1' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-out duration-300"
                    enterFrom='opacity-0'
                    enterTo="opacity-50"
                    leave="transition-opacity ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="position-fixed top-0 start-0 bg-black w-100 h-100 "></div>
                </Transition.Child>
                <div className='position-relative'>
                    <div className="d-flex justify-content-center align-items-center text-start">
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-out duration-300"
                            enterFrom='opacity-0'
                            enterTo="opacity-100"
                            leave="transition-opacity ease-in duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className="position-fixed top-50 start-50 translate-middle overflow-auto mh-[95vh]  w-25 bg-white rounded-3 mx-auto p-4 ">

                                <form onSubmit={formik.handleSubmit}>

                                    <div className="d-flex flex-row w-100 gap-2">
                                        <div className="d-flex flex-column">

                                            <CustomInput
                                                type="text"
                                                label="Firstname"
                                                id="firstname"
                                                name="firstname"
                                                onChng={formik.handleChange("firstname")}
                                                onBlr={formik.handleBlur("firstname")}
                                                val={formik.values.firstname}
                                            />
                                            <div className="error mt-2">
                                                {formik.touched.firstname && formik.errors.firstname}
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">

                                            <CustomInput
                                                type="text"
                                                label="Lastname"
                                                id="lastname"
                                                name="lastname"
                                                onChng={formik.handleChange("lastname")}
                                                onBlr={formik.handleBlur("lastname")}
                                                val={formik.values.lastname}
                                            />
                                            <div className="error mt-2">
                                                {formik.touched.lastname && formik.errors.lastname}
                                            </div>
                                        </div>
                                    </div>
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

                                    <CustomInput
                                        type="text"
                                        label="Mobile"
                                        id="mobile"
                                        name="mobile"
                                        onChng={formik.handleChange("mobile")}
                                        onBlr={formik.handleBlur("mobile")}
                                        val={formik.values.mobile}
                                    />
                                    <div className="error mt-2">
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                    <CustomInput
                                        type="text"
                                        label="Address"
                                        id="address"
                                        name="address"
                                        onChng={formik.handleChange("address")}
                                        onBlr={formik.handleBlur("address")}
                                        val={formik.values.address}
                                    />
                                    <div className="error mt-2">
                                        {formik.touched.address && formik.errors.address}
                                    </div>


                                    <button
                                        className="bg-ffd333 border-0 mt-2 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 rounded-1"
                                        type="submit"


                                    >
                                        Submit
                                    </button>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>


    )
}

export default ProfileEdit
import React from 'react'

const CustomButton = (props) => {
    const {title,type,styles,handleClick}=props;
  return (
    <button
        type={type||"submit"}
        className={`bg-ffd333 border-0 mt-2 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 rounded-1 ${styles}`}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton
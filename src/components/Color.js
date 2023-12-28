import React from "react";

const Color = (props) => {
  const {colorData,setColor} = props;
  return (
    <>
      <div className="colors ps-0">
       {
        colorData && colorData?.map((item,index)=>{
          return(
            <div  style = {{backgroundColor:item?.title}} key={index}></div>
          )
        })
        }
      </div>
    </>
  );
};

export default Color;

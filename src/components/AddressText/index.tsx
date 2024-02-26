import { classNames } from "@/utils/classNames";
import { copyToClipboard, truncateString } from "@/utils/util";
import React, { FC } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddressTextProps = {
  text: string;
} & StyleType;

export const AddressText: FC<AddressTextProps> = ({
  text,
  style,
  className,
}) => {
  const onClick = () => {
    copyToClipboard(text);
    toast.success(
      <div className="flex flex-col ml-4 w-[230px]">
        <span className="mb-2">Address Copied</span>
        <span className="truncate text-[#C8C5C5] text-[10px]">{text}</span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        closeButton: false,
        //   style:{background:'red'}
      }
    );
  };
  return (
    <>
      <div
        onClick={onClick}
        style={style}
        className={classNames(
          className,
          "w-fit bg-[#819DF54D] text-[#819DF5] px-[8px] py-[6px] rounded-[4px] cursor-pointer select-none	text-[12px]"
        )}
      >
        {truncateString(text)}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

import { copyToClipboard } from "@/utils/util";
import React, { FC } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddressTextProps = {
  text: string;
};

export const AddressText: FC<AddressTextProps> = ({ text }) => {
  const onClick = () => {
    copyToClipboard(text);
    toast.success(<div>"🦄 Wow so easy!"</div>, {
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
    });
  };
  return (
    <>
      <div
        onClick={onClick}
        className="bg-[#819DF54D] text-[#819DF5] px-[8px] py-[6px] rounded-[4px] cursor-pointer select-none	"
      >
        {text}
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

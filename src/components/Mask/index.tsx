import { useEffect, useRef } from "react";
import Style from "./style.module.scss";
import { noop } from "@/utils/util";
import { nexttick } from "@/utils/nexttick";

type MaskProps = {
  open?: boolean;
  onClose?: () => void;
};

const hideMaskElement = (ele: HTMLElement) => {
  ele.classList.remove(Style["mask-show"]);
  ele.classList.add(Style["mask-hide"]);
};

const showMaskElement = (ele: HTMLElement) => {
  ele.style.display = "block";
  nexttick(() => {
    ele.classList.remove(Style["mask-hide"]);
    ele.classList.add(Style["mask-show"]);
  });
};

const addMaskElement = (
  ele: HTMLElement,
  callbacks: Record<string, Function>
) => {
  const maskEle = document.createElement("div");
  maskEle.classList.add(Style["mask"]);
  maskEle.addEventListener("click", function () {
    // hideMaskElement(maskEle);
    callbacks.onClose();
  });
  maskEle.addEventListener("transitionend", function (event) {
    const opcity = window.getComputedStyle(maskEle).getPropertyValue("opacity");
    if (event.propertyName === "opacity" && opcity === "0") {
      maskEle.style.display = "none";
    }
  });
  ele.appendChild(maskEle);
  return maskEle;
};

export const Mask = ({ open = false, onClose = noop }: MaskProps) => {
  const maskRef = useRef<HTMLElement>();
  const callbackRef = useRef<Record<string, Function>>();
  callbackRef.current = {
    onClose,
  };
  useEffect(() => {
    const ele = document.getElementById("wallet-ui");
    if (!ele) {
      return;
    }
    maskRef.current = addMaskElement(ele, callbackRef?.current ?? {});
    if (!open) {
      maskRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    if (!maskRef.current) {
      console.log("aaa");
      return;
    }
    if (open) {
      showMaskElement(maskRef.current);
    } else {
      hideMaskElement(maskRef.current);
    }
  }, [open]);
  return <></>;
};

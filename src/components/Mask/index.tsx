import { useEffect, useRef, useState } from "react";
import Style from "./style.module.scss";
import { noop } from "@/utils/util";
import { nexttick } from "@/utils/nexttick";
import { createPortal } from "react-dom";
import { classNames } from "@/utils/classNames";
import { useDisplayNone } from "@/hooks/useDisplayNone";

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

export const Mask = ({ open = false, onClose = noop }: MaskProps) => {
  const maskRef = useRef<HTMLDivElement>();
  const [isBrowser, setIsBrowser] = useState(false);
  // const [animationType, setAnimationType] = useState(open);
  const { animationType, onTransitionEnd } = useDisplayNone({
    target: maskRef.current,
    open,
    attr: "opacity",
  });
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  return isBrowser ? (
    createPortal(
      <div
        ref={maskRef}
        className={classNames(
          Style["mask"],
          Style[animationType ? "mask-show" : "mask-hide"]
        )}
        onClick={onClose}
        onTransitionEnd={onTransitionEnd}
      ></div>,
      document.getElementById("wallet-ui") as HTMLDivElement
    )
  ) : (
    <></>
  );
};

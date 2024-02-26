"use client";
import { createPortal } from "react-dom";
import Style from "./styles.module.scss";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Mask } from "../Mask";
import { classNames } from "@/utils/classNames";
import { useDisplayNone } from "@/hooks/useDisplayNone";

type PopupProps = {
  position: "top" | "bottom" | "left" | "right";
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export const Popup = ({
  position = "bottom",
  open = false,
  onClose,
  children,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>();
  const [isBrowser, setIsBrowser] = useState(false);
  const { animationType, onTransitionEnd } = useDisplayNone({
    target: popupRef.current,
    open,
    attr: "transform",
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const styles = {
    top: Style["popup-top"],
    bottom: Style["popup-bottom"],
    left: Style["popup-left"],
    right: Style["popup-right"],
  };

  const handleClose = () => {};

  const popup = (
    <>
      <div
        ref={popupRef}
        className={classNames(
          Style["popup"],
          styles[position],
          position === "top" || position === "bottom" ? "layout" : "",
          Style[
            animationType ? `popup-${position}-show` : `popup-${position}-hide`
          ]
        )}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
      <Mask open={open} onClose={onClose}></Mask>
    </>
  );
  // const popup = <div></div>
  return isBrowser ? (
    createPortal(popup, document.getElementById("wallet-ui") as HTMLDivElement)
  ) : (
    <></>
  );
};

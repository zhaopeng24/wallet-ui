import { useEffect, useState } from "react";

const ATTR_MAP = {
  opacity: (ele) => {
    const opcity = window.getComputedStyle(ele).getPropertyValue("opacity");
    return opcity === "0";
  },
  transform: (ele) => {
    const transform = window
      .getComputedStyle(ele)
      .getPropertyValue("transform");
    // 使用正则表达式提取 translate 值
    const matrixRegex = /matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\)/;

    const match = transform.match(matrixRegex);
    const translateX = parseFloat(match?.[5]??'0');
    const translateY = parseFloat(match?.[6]??'0');

    console.log(match,translateX, translateY,"fffffffffff");
    return transform === "0";
  },
};

type Props = {
  target: HTMLElement | undefined;
  open: boolean;
  attr: keyof typeof ATTR_MAP;
};

// 在需要样式display:none之前播放完动画，已经当display：block的时候执行动画
export const useDisplayNone = ({ target, open, attr }: Props) => {
  const [animationType, setAnimationType] = useState(open);

  useEffect(() => {
    if (!target) {
      return;
    }
    if (open) {
      target.style.display = "block";
    }
    setAnimationType(open);
  }, [target, open]);
  const onTransitionEnd = () => {
    if (!target) {
      return;
    }
    const cb = ATTR_MAP[attr];
    if (!open) {
      target.style.display = "none";
    }
  };

  return {
    animationType,
    onTransitionEnd,
  };
};

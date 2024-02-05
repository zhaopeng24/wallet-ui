import { Button } from "@nextui-org/react";
import { Popup } from "../Popup";
import Style from "./style.module.scss";
import { classNames } from "@/utils/classNames";
type BridgeProps = {
  open?: boolean;
  title?: string;
  onClose?: () => void;
};

const BridgeList = () => {
  const data = [1, 2];
  return (
    <div className={Style["bridge-list"]}>
      <div className={Style["left"]}>
        <div className={Style["name"]}>Bridge</div>
        <div className={Style["fee"]}>Fees</div>
        <div className={Style["time"]}>Time</div>
      </div>
      <div className={Style["right"]}>
        {data?.map((item) => (
          <BridgeItem key={item}></BridgeItem>
        ))}
      </div>
    </div>
  );
};
const BridgeItem = () => {
  return (
    <div className={classNames(Style["bridge-item"], Style["selected"])}>
      <div className={Style["name"]}>
        <img></img>
        <span>Circle CCTP</span>
      </div>
      <div className={Style["fee"]}>$0.53~$0.76</div>
      <div className={Style["time"]}>30s~50s</div>
      <div className={Style["select"]}>30s~50s</div>
    </div>
  );
};

export const Bridge = ({ open, onClose, title }: BridgeProps) => {
  return (
    <Popup open={open} onClose={onClose} position={"bottom"}>
      <div className={Style["bridge"]}>
        {title && <div className={Style["title"]}>{title}</div>}
        <BridgeList></BridgeList>
        <div className={Style["buttons"]}>
          <Button radius="lg" className="w-[148px]">
            Cancel
          </Button>
          <Button radius="lg" className="w-[148px] bg-[#456ADE]">
            Confirm
          </Button>
        </div>
      </div>
    </Popup>
  );
};

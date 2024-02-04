import { Popup } from "../Popup";

type BridgeProps = {
  open?: boolean;
  onClose?: () => void;
}

export const Bridge = ({open,onClose}:BridgeProps) => {
  return (
    // <div>xxx</div>
    <Popup open={open} onClose={onClose} position={"bottom"}>
      <div className="h-[200px] bg-white">bridge</div>
    </Popup>
  );
};

import toast from "react-hot-toast";

function Toast(text: string) {
  toast((t) => <span className="text-xs text-[#1C2F04]">{text}</span>, {
    style: { borderRadius: "10px", marginTop: "20px" },
    duration: 2000,
  });
}
export default Toast;

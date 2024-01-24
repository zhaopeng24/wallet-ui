import Triangle from "@/public/imgs/triangle.svg";
type Arrow = {
  src: string;
  type?: "success" | "pending";
};
export const Arrow = ({ src, type = "success" }: Arrow) => {
  return (
    <div className="h-full w-full flex flex-col items-center relative">
      <div className="w-[2px] bg-white flex-1"></div>
      <svg
        className="rotate-90 mt-[-2px]"
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5L0.5 9.33013L0.5 0.669872L8 5Z" fill="white" />
      </svg>
      {src && (
        <img
          className="w-6 h-6 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full"
          src={src}
        ></img>
      )}
    </div>
  );
};

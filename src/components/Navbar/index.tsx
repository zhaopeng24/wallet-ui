import { BackSvg } from "../Icons/BackSvg";

export const Navbar = ({ title }) => {
  return (
    <div className="relative w-full py-[10px]">
      <div className="absolute cursor-pointer left-8">
        <BackSvg></BackSvg>
      </div>
      <div className="text-center font-bold">{title}</div>
    </div>
  );
};

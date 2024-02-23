import { ReactNode, FC } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  leftBtn?: ReactNode;
}
const Header: FC<HeaderProps> = (props) => {
  const { title, showBack } = props;
  const router = useRouter();
  function handleBack() {
    router.back();
  }
  return (
    <div className="p-6 relative">
      {showBack ? (
        <img
          onClick={handleBack}
          src="/imgs/back.png"
          alt=""
          className="absolute cursor-pointer left-8 top-1/2 -translate-y-1/2 h-3 w-2"
        />
      ) : null}
      <div className="text-white font-bold text-center">{title}</div>
    </div>
  );
};
export default Header;

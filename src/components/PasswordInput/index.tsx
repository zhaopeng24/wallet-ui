import React, { FC, useMemo } from "react";
import { Input, InputProps } from "@nextui-org/input";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { PwdPattern } from "@/consts/pattern";

interface PasswordInputProps extends InputProps {
  firstPassword?: string;
  passwordType?: "first" | "comfirm";
  isShowTip?: boolean;
}
const PasswordInput: FC<PasswordInputProps> = (props) => {
  const { value, firstPassword, passwordType = "first", isShowTip = true } = props;
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // 8-16位字母和数字的密码
  const validatePassword = (value: string = "") => value.match(PwdPattern);

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    if(!isShowTip) return false;
    if (passwordType === "comfirm" && firstPassword !== value) return true;
    return validatePassword(value) ? false : true;
  }, [value]);

  const tip = useMemo(() => {
    if (value === "") return "";
    if(!isShowTip) return false;
    if (!isInvalid) {
      if (passwordType === "comfirm") return "";
      return (
        <span className="text-[#819DF580]">
          Password strength: <span className="text-[#87FF28]">Good</span>
        </span>
      );
    } else {
      if (passwordType === "comfirm" && firstPassword !== value) {
        return (
          <span className="text-[#F31260]">
            The two passwords are not the same
          </span>
        );
      } else {
        return (
          <span className="text-[#F31260]">Must be at least 8 characters</span>
        );
      }
    }
  }, [isInvalid, firstPassword, passwordType]);

  return (
    <Input
      label="Password"
      variant="bordered"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      isInvalid={isInvalid}
      className="relative"
      type={isVisible ? "text" : "password"}
      description={tip}
      {...props}
    />
  );
};

export default PasswordInput;

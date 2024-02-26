import React, { FC, useMemo } from "react";
import { Input, InputProps } from "@nextui-org/input";
import { EmailPattern } from "@/consts/pattern";

const EmailInput: FC<InputProps> = (props) => {
  const { value } = props;
  // 8-16位字母和数字的密码
  const validatePassword = (value: string = "") => value.match(EmailPattern);

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    return validatePassword(value) ? false : true;
  }, [value]);

  const tip = useMemo(() => {
    if (value === "") return "";
    if (!isInvalid) {
      return "";
    } else {
      return (
        <span className="text-[#F31260]">
          Please enter the correct email address
        </span>
      );
    }
  }, [isInvalid]);

  return (
    <Input
      isClearable
      isInvalid={isInvalid}
      description={tip}
      type="email"
      variant="bordered"
      {...props}
    />
  );
};

export default EmailInput;

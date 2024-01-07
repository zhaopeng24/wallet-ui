import React, { FC, useMemo } from "react";
import { Input, InputProps } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const PasswordInput: FC<InputProps> = (props) => {
  const { value } = props
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // 8-16位字母和数字的密码
  const validatePassword = (value: string = '') => value.match(/^[a-zA-Z0-9]{8,16}$/)

  const isInvalid = useMemo(() => {
    if (value === '') return false;
    return validatePassword(value) ? false : true;
  }, [value]);

  const tip = useMemo(() => {
    return <span className="text-[#819DF580]">Password strength: <span className="text-[#87FF28]">Good</span></span>
  }, [])
  return (
    <Input
      label="Password"
      variant="bordered"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      isInvalid={isInvalid}
      className='relative'
      type={isVisible ? "text" : "password"}
      description={tip}
      { ...props }
    />
  );
}

export default PasswordInput

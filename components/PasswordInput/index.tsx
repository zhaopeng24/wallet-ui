import React, { FC, useMemo } from "react";
import { Input, InputProps } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const PasswordInput: FC<InputProps> = (props) => {
  const { value } = props
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (value: string = '') => value.match(/.d[6]/)

  const isInvalid = useMemo(() => {
    if (value === '') return false;
    return validatePassword(value) ? false : true;
  }, [value]);


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
      description="Password strength Good"
      { ...props }
    />
  );
}

export default PasswordInput

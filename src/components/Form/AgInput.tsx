import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

import AgLabel from "./AgLabel";

export default function AgInput({
  label,
  name,
  placeholder = " ",
  description,
  type = "text",
  labelPlacement = "outside",
  errorMessage,
  isRequired,
  defaultValue,
  disabled,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  type?: string;
  labelPlacement?: "outside" | "inside";
  errorMessage?: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };
  return (
    <Input
      classNames={{
        label: "flex flex-row items-center after:hidden",
        input: ["bg-transparent"],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "bg-[#F8F9FB]",
          "border-1",
          "border-[#EAEDF3]",
          "rounded-md",
          "data-[hover=true]:bg-[#F8F9FB]",
          "data-[focus=true]:bg-[#F8F9FB]",
        ],
      }}
      isRequired={isRequired}
      errorMessage={errorMessage}
      label={
        <AgLabel
          label={label}
          isRequired={isRequired}
          description={description}
        />
      }
      labelPlacement={labelPlacement}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    />
  );
}

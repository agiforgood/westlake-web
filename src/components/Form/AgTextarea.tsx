import { useState } from "react";
import { Textarea } from "@heroui/react";
import AgLabel from "./AgLabel";

export default function AgTextarea({
  label,
  name,
  placeholder,
  variant = "flat",
  labelPlacement = "outside",
  isRequired,
  defaultValue,
  onChange,
  popoverContent,
}: {
  label: string;
  name: string;
  placeholder?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined";
  labelPlacement?: "outside" | "inside";
  isRequired?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
  popoverContent?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (value: string) => {
    setValue(value);
    onChange?.(value);
  };
  return (
    <Textarea
      classNames={{
        label: "text-foreground",
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
      key={variant}
      label={
        <AgLabel
          label={label}
          isRequired={isRequired}
          content={popoverContent}
        />
      }
      name={name}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      variant={variant}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleChange}
    />
  );
}

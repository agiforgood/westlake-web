import { useState } from "react";
import { RadioGroup, Radio, cn } from "@heroui/react";

export default function AgRadio({
  label,
  name,
  options,
  isRequired,
  defaultValue,
  onChange,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  isRequired?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <RadioGroup
      classNames={{
        label: "text-foreground text-sm",
      }}
      label={label}
      name={name}
      orientation="horizontal"
      isRequired={isRequired}
      value={value}
      onValueChange={handleValueChange}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <Radio
          classNames={{
            base: "flex flex-row gap-2 justify-between items-center w-full",
            label: "text-foreground text-sm",
          }}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}

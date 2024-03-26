import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export interface RadioSelectProps {
  label: string;
  groupId: string;
  options: {
    label: string;
    value: string;
  }[];
  // react-hook-form
  formKey?: string;
  setValue?: UseFormSetValue<any>;
  // react-hook-form EOL
  defaultValue?: string;
}

const RadioSelect: React.FC<RadioSelectProps> = (props) => {
  const {
    label,
    groupId = "",
    options,
    formKey,
    setValue,
    defaultValue = "",
  } = props;
  const [formValue, setFormValue] = useState<string>(defaultValue);
  const labelClassWithGroupId = `bg-leather-500 border-leather-500 font-medium text-white`;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  useEffect(() => {
    if (!!formKey && !!setValue) setValue(formKey, formValue);
  }, [formKey, formValue, setValue]);

  return (
    !!groupId && (
      <div>
        <h3 className="mb-1 font-medium">{label}:</h3>
        <div className="flex flex-wrap items-center gap-4">
          {options.map(({ label: selectLabel, value }, i) => (
            <div
              key={`${groupId}-${i}`}
              className="relative whitespace-nowrap text-center"
            >
              <input
                type="radio"
                name={`${groupId}`}
                id={`${groupId}-${value}`}
                value={value}
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleValueChange}
                checked={value === formValue}
              ></input>
              <label
                htmlFor={`${groupId}-${value}`}
                className={`inline-block h-full w-full rounded border-2 px-4 py-1  ${value === formValue && labelClassWithGroupId}`}
              >
                {selectLabel}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RadioSelect;

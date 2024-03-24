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
  const inputClassWithGroupId = `peer/${groupId}`;
  const labelClassWithGroupId = `peer-checked/${groupId}:bg-leather-500 peer-checked/${groupId}:border-leather-500 peer-checked/${groupId}:font-medium peer-checked/${groupId}:text-white`;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  useEffect(() => {
    if (!!formKey && !!setValue) setValue(formKey, formValue);
  }, [formKey, formValue, setValue]);

  return (
    <div>
      <h3 className="mb-1">{label}</h3>
      <div className="flex items-center gap-4">
        {options.map(({ label: selectLabel, value }, i) => (
          <div
            key={groupId}
            className="group-hover:border-leather-500 group relative text-center"
          >
            <input
              type="radio"
              name="weight"
              id={selectLabel + value}
              value={value}
              className={`absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 ${!!groupId && inputClassWithGroupId}`}
              onChange={handleValueChange}
              checked={value === formValue}
            ></input>
            <label
              htmlFor={selectLabel + value}
              className={`group-hover:text-leather-500 inline-block h-full w-full rounded border-2 px-4 py-1 ${!!groupId && labelClassWithGroupId}`}
            >
              {selectLabel}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioSelect;

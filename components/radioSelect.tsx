import React from "react";

export interface RadioSelectProps {
  label: string;
  groupId: string;
  options: {
    label: string;
    value: string;
  }[];
  // react-hook-form
  value?: string;
  onChange?: (value: string) => void;
  // react-hook-form EOL
}

const RadioSelect: React.FC<RadioSelectProps> = (props) => {
  const { label, groupId = "", options, value, onChange } = props;
  const labelClassWithGroupId = `bg-blue border-blue font-medium text-white`;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange(e.target.value);
  };

  return (
    !!groupId && (
      <div>
        <h3 className="mb-1 font-medium">{label}:</h3>
        <div className="flex flex-wrap items-center gap-4">
          {options.map(({ label: selectLabel, value: selectValue }, i) => (
            <div
              key={`${groupId}-${i}`}
              className="relative whitespace-nowrap text-center"
            >
              <input
                type="radio"
                name={`${groupId}`}
                id={`${groupId}-${value}`}
                value={selectValue}
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleValueChange}
                checked={value === selectValue}
              ></input>
              <label
                htmlFor={`${groupId}-${value}`}
                className={`inline-block h-full w-full rounded border-2 px-4 py-1  ${value === selectValue && labelClassWithGroupId}`}
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

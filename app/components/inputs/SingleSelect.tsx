"use client";

import Select from "react-select";

export type SingleSelectValue = {
  label: string;
  value: string;
};

interface SingleSelectProps {
  value?: SingleSelectValue;
  onChange: (value: SingleSelectValue) => void;
  options: SingleSelectValue[];
  placeholder: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="relative ">
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as SingleSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#DBDBDB",
            primary50: "#8B8B8B",
          },
        })}
      />
    </div>
  );
};

export default SingleSelect;

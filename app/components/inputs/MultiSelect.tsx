"use client";

import Select from "react-select";

export type MultiSelectValue = {
  label: string;
  value: string;
};

const options = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "data-science", label: "Data Science" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

interface MultiSelectProps {
  value?: MultiSelectValue;
  onChange: (value: MultiSelectValue[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ value, onChange }) => {
  return (
    <div className="relative z-99">
      <Select
        placeholder="Careers"
        isClearable
        options={options}
        value={value}
        onChange={(selectedOptions: any) =>
          onChange(
            selectedOptions ? (selectedOptions as MultiSelectValue[]) : []
          )
        }
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
        isMulti
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

export default MultiSelect;

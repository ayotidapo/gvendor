import React from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[]; 
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  options =[],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
}) => {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full p-2 h-[56px] border rounded-md focus:outline-none ${
          error ? 'border-red-500' : 'border-black'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {Array.isArray(options) && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
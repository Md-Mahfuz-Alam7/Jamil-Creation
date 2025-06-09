import React from 'react';

const Dropdown = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select an option', 
  disabled = false, 
  required = false,
  className = '',
  ...props 
}) => {
  const selectClasses = `w-full h-10 px-2 py-2 bg-[#f7f9fc] border border-[#cedbe8] rounded-lg text-[14px] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`;
  
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-[16px] font-medium leading-[20px] text-[#0c141c] font-inter mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClasses}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
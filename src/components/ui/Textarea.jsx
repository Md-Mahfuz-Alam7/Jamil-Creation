import React from 'react';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled = false, 
  required = false,
  rows = 4,
  className = '',
  ...props 
}) => {
  const textareaClasses = `w-full px-3 py-2 bg-[#f7f9fc] border border-[#cedbe8] rounded-lg text-[14px] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical ${className}`;
  
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-[16px] font-medium leading-[20px] text-[#0c141c] font-inter mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
    </div>
  );
};

export default Textarea;
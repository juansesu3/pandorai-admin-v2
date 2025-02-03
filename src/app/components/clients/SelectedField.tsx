import React from "react";

interface SelectFieldProps {
  label: string;
  id: string;
  options: string[];
  formik: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, options, formik }) => {
  return (
    <div className="relative">
      <label className="block text-gray-600">{label}</label>
      <select
        id={id}
        name={id}
        className="dark:bg-[#0f182b] dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-md w-full px-4 py-2"
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {formik.touched[id] && formik.errors[id] ? (
        <p className="text-red-500 text-sm">{formik.errors[id]}</p>
      ) : null}
    </div>
  );
};

export default SelectField;

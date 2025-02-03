import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  formik: any;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = "text", formik, fullWidth = false }) => {
  return (
    <div className={`relative ${fullWidth ? "md:col-span-2" : ""}`}>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className={`dark:bg-[#0f182b] dark:text-white peer px-4 pt-6 pb-2 border border-neutral-200 dark:border-neutral-800 rounded-md w-full h-28 focus:outline-none resize-none ${
            formik.errors[id] && formik.touched[id] ? "border-red-500" : ""
          }`}
          placeholder=" "
          value={formik.values[id]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className={`dark:bg-[#0f182b] dark:text-white peer px-4 pt-6 pb-2 border border-neutral-200 dark:border-neutral-800 rounded-md w-full focus:outline-none ${
            formik.errors[id] && formik.touched[id] ? "border-red-500" : ""
          }`}
          placeholder=" "
          value={formik.values[id]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
      <label
        htmlFor={id}
        className="absolute top-1 left-2 text-gray-500 transition-all duration-300 ease-in-out transform -translate-y-0 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600"
      >
        {label}
      </label>
      {formik.touched[id] && formik.errors[id] ? (
        <p className="text-red-500 text-sm">{formik.errors[id]}</p>
      ) : null}
    </div>
  );
};

export default InputField;

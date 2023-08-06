import React from 'react';
import { useField } from 'formik';

const CustomSelect = (props) => {
  const [field, meta] = useField(props);

  return (
    <fieldset className="w-full">
      <select
        {...field}
        {...props}
        className={`mb-1 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2 ${
          meta.touched && meta.error ? 'border-2 border-rose-400' : ''
        }`}
      />
      {meta.touched && meta.error && (
        <p className="text-xs text-rose-400">{meta.error}</p>
      )}
    </fieldset>
  );
};

export default CustomSelect;

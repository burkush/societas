import { useField } from 'formik';

const CustomInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <fieldset className="w-full">
      <input
        {...field}
        {...props}
        className={`mb-1 w-full border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block p-2 ${
          meta.touched && meta.error ? 'border-2 border-rose-400' : ''
        }`}
      />
      {meta.touched && meta.error && (
        <p className="text-xs text-rose-400">{meta.error}</p>
      )}
    </fieldset>
  );
};
export default CustomInput;

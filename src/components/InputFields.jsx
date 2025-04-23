import { Controller } from "react-hook-form";

/**
 * InputField Component
 * A reusable input component for use with react-hook-form and Tailwind CSS.
 */
const InputField = ({ name, control, label, type = "text", error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensure the input is always controlled
        render={({ field }) => (
          <input
            id={name}
            {...field}
            type={type}
            value={field.value || ""} // Fallback to empty string if undefined
            className="w-full p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;

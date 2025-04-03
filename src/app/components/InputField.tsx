import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  options?: string[]; // For select input
  toggle?: () => void; // For password visibility toggle
  showToggleIcon?: boolean;
  icon?: React.ReactNode;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  options,
  toggle,
  showToggleIcon,
  icon,
}: InputFieldProps) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium text-gray-700 ${
          type === "file" ? "" : ""
        }`}
        htmlFor={name}
      >
        {label}
      </label>

      {type === "select" && options ? (
        <select
          {...register(name)}
          className="mt-1 w-full border border-gray-300 p-2 rounded-md"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={type}
            {...register(name)}
            className={`mt-1 w-full border border-gray-300 p-2 rounded-md ${
              type === "file" ? "hidden cursor-pointer" : ""
            }`}
            {...inputProps}
            {...(type !== "file" ? { defaultValue } : {})}
            id={name} 
          />
          {showToggleIcon && (
            <button
              type="button"
              onClick={toggle}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {icon}
            </button>
          )}
        </div>
      )}

      {error?.message && (
        <p className="text-red-500 text-xs">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;

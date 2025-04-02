import { FieldError } from "react-hook-form";

type InputFieldProps = {
    label: string;
    type?: string;
    register: any;
    name: string;
    defaultValue: string;
    error: FieldError;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}
const InputField = ({
    label,type="text",register,name,defaultValue,error,inputProps
}:InputFieldProps) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          {...register({ name })}
          className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          {...inputProps}
          defaultValue={defaultValue}
        />
        {error?.message && (
          <p className="text-red-500 text-xs">{error.message.toString()}</p>
        )}
      </div>
    );
}

export default InputField;
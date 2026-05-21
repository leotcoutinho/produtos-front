interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        <input
          className="flex w-full space-y-2 bg-white rounded p-3 border border-gray-400"
          name={name}
          {...rest}
        />
      </label>
    </div>
  );
}

export default Input;

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-gray-500 rounded-md p-2 text-white"
      type="button"
      {...props}
    >
      {props.value}
    </button>
  );
}

export default Button;

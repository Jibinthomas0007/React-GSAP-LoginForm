export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}) {
  const baseStyles =
    "w-full py-2 rounded-lg transition font-medium";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}
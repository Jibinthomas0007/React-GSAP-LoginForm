import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type = "text",
  name,
  register,
  error,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      {/* Input Field */}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder || `Enter your ${label}`}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition-all pr-10
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-blue-300"
        }`}
      />

      {/* 👁️ Password Toggle Button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
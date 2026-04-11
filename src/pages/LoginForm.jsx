import { useState } from "react";
import Input from "../components/form/Input";
import FormWrapper from "../components/form/FormWrapper";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import { loginSchema } from "../validations/authSchemas";

export default function LoginForm({ switchToRegister }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const username = data.username.trim();
      const password = data.password;

      // 🔹 Step 1: Check local user
      const user = users.find((u) => u.username === username);

      if (user) {
        if (user.password !== password) {
          setError("password", {
            type: "manual",
            message: "Incorrect password",
          });
          return;
        }

        // ✅ Local login success
        const authData = {
          user: { username: user.username },
          token: "local-token",
        };

        localStorage.setItem("auth", JSON.stringify(authData));
        dispatch(loginSuccess(authData));

        navigate("/dashboard");
        return;
      }

      // 🔹 Step 2: API login
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError("password", {
          type: "manual",
          message: result.message || "Invalid username or password",
        });
        return;
      }

      // ✅ API login success
      const authData = {
        user: result,
        token: result.token,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      dispatch(loginSuccess(authData));

      navigate("/dashboard");

    } catch (error) {
      setError("password", {
        type: "manual",
        message: "Server error. Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Welcome Back">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Username */}
        <Input
          label="Username"
          name="username"
          placeholder="Enter your username"
          register={register}
          error={errors.username}
        />

        {/* Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
        />

        {/* Submit */}
        <Button type="submit" disabled={!isValid || loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Switch */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </form>
    </FormWrapper>
  );
}
import { useState } from "react";
import Input from "./components/form/Input";
import FormWrapper from "./components/form/FormWrapper";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "./components/form/Button";

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required("Username is required"),
  password: yup.string().min(6).required(),
});

export default function LoginForm({ switchToRegister }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.username === data.name &&
        u.password === data.password
    );  

    if (!user) {
      alert("Invalid username or password ❌");
      return;
    }

    const authData = {
      user: { username: user.username },
      token: "fake-token",
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    dispatch(loginSuccess(authData));
    navigate("/dashboard");
  };


  return (
    <FormWrapper title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <Input
          label="User Name"
          name="name"
          type="text"
          register={register}
          error={errors.name}
          placeholder="Enter your name"
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            register={register}
            error={errors.password}
            placeholder="Enter your password"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-xs cursor-pointer text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <Button type="submit" className="mt-2">
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>

      </form>
    </FormWrapper>
  );
}
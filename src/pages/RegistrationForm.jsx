import { useState } from "react";
import FormWrapper from "../components/form/FormWrapper";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validations/authSchemas";

export default function RegistrationForm({ switchToLogin }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);    

  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  // ✅ Submit Handler
  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const email = data.email.toLowerCase();

      const userExists = users.find((u) => u.email === email);

      // If email is already registered → show error under EMAIL FIELD
      if (userExists) {
        setError(
          "email",
          {
            type: "manual",
            message: "This email is already registered. Try logging in.",
          },
          { shouldFocus: true }
        );

        setLoading(false);
        return;
      }

      const newUser = {
        username: data.username,
        email,
        phone: data.phone,
        password: data.password, 
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const authData = {
        user: newUser,
        token: "local-token",
      };

      localStorage.setItem("auth", JSON.stringify(authData));

      setLoading(false);

      // ✅ Redirect
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <FormWrapper title="Registration Form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username}
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          register={register}
          error={errors.phone}
        />

        <Input
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
        />

        {/* ✅ Button */}
        <Button type="submit" disabled={!isValid || loading}>
          {loading ? "Creating Account..." : "Register Now"}
        </Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>
    </FormWrapper>
  );
}
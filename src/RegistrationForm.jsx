import FormWrapper from "./components/form/FormWrapper";
import Input from "./components/form/Input";
import Button from "./components/form/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({ switchToLogin }) {
  const navigate = useNavigate();

  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(/^[0-9]{10}$/).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === data.email);

    if (userExists) {
      alert("User already exists ❌");
      return;
    }

    users.push({
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful ✅");

    navigate("/dashboard");
  };


  return (
    <FormWrapper title="Registration Form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input label="Username" name="username" register={register} error={errors.username} />
        <Input label="Phone" name="phone" register={register} error={errors.phone} />
        <Input label="Email" name="email" register={register} error={errors.email} />
        <Input label="Password" name="password" type="password" register={register} error={errors.password} />
        <Input label="Confirm Password" name="confirmPassword" type="password" register={register} error={errors.confirmPassword} />

        <Button type="submit">Register Now</Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>

      </form>
    </FormWrapper>
  );
}
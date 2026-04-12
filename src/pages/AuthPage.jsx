import AuthCardSwitcher from "../components/form/AuthCardSwitcher";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function AuthPage() {
  return (
    <AuthCardSwitcher
      firstComponent={LoginForm}
      secondComponent={RegistrationForm}
    />
  );
}
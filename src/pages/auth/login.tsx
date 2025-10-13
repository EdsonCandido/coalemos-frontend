import { LoginForm } from "@/components/login/login-form";
import { memo } from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
    </div>
  );
};
export default memo(LoginPage);

import loginImage from "../assets/images/Person1.png";
import { AuthForm } from "../components/AuthForm";
export const Login = () => {
  return (
    <AuthForm
      formType="login"
      buttonText="Login"
      successMessage="Logged in successfully"
      image={loginImage}
      text={
        "Welcome Back, Achiever! Dive into todo and kickstart a day of productivity, Login to continue."
      }
      headingText={"Login to continue"}
    />
  );
};

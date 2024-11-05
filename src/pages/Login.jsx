import loginImage from "../assets/Images/login.webp";
import { Template } from "../components/core/Auth";

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImage}
      formType="login"
    />
  );
};

export default Login;

import signupImage from "../assets/Images/signup.webp";
import { Template } from "../components/core/Auth";

const Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImage}
      formType="signup"
    />
  );
};

export default Signup;

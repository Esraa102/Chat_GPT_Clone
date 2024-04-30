import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const SignUp = () => {
  return (
    <div className="w-full px-6 py-8 flex items-center flex-col gap-4 justify-center">
      <Link to={"/"} className="flex items-center gap-1">
        <img src="/assets/logo.png" alt="logo" className="w-[60px] h-[60px]" />
        <span className="text-3xl font-bold text-main">Chat GPT</span>
      </Link>
      <p className="text-sm text-gray-400 text-center">
        Welcome To Chat GPT, Please enter your account details to create a new
        account
      </p>
      <AuthForm isRegister={true} />
      <p>
        Already Have an account?{" "}
        <Link
          to={"/sign-in"}
          className="hover:text-main hover:underline transition font-semibold"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

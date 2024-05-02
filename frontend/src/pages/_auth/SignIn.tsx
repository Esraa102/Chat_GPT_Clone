/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../../components";
import { UseAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const SignIn = () => {
  const auth = UseAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/chat");
    }
  }, [auth]);
  if (!auth) return null;
  return (
    <div className="w-full px-6 py-8 flex items-center flex-col gap-4 justify-center">
      <Link to={"/"} className="flex items-center gap-1">
        <img src="/assets/logo.png" alt="logo" className="w-[60px] h-[60px]" />
        <span className="text-3xl font-bold text-main">Chat GPT</span>
      </Link>
      <p className="text-sm text-gray-400 text-center">
        Welcome Back!! Please enter your account details to Sign In
      </p>
      <AuthForm isRegister={false} />
      <p>
        Don't have an account?{" "}
        <Link
          to={"/sign-up"}
          className="hover:text-main hover:underline transition font-semibold"
        >
          Create One!
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

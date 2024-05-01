import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AuthUser, UseAuthContext } from "../context/AuthContext";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const AuthForm = ({ isRegister }: { isRegister: boolean }) => {
  const emailPattern =
    /^[a-zA-Z0-9_!#$%&*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/;
  const [isVisible, setIsVisible] = useState(false);
  const { logIn, loading, signUp } = UseAuthContext() as AuthUser;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (isRegister) {
      signUp(data.email, data.password, data.username);
    } else {
      logIn(data.email, data.password);
    }
  };
  return (
    <form className="form box-shadow" onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Esraa Gm.."
            className={`input ${
              errors.username && "border-red-700 border-2 focus:border-red-700"
            }`}
            {...register("username", {
              required: {
                value: true,
                message: "Username Is Required",
              },
              minLength: {
                value: 2,
                message: "Username Should be at least 2 characters",
              },
              maxLength: {
                value: 30,
                message: "Username can't be greater than 30 characters",
              },
            })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="esraa1925.gamal@gmail.com"
          className={`input ${
            errors.email && "border-red-700 border-2 focus:border-red-700"
          }`}
          {...register("email", {
            required: {
              value: true,
              message: "Email Is Required",
            },
            pattern: {
              value: emailPattern,
              message: "Please Enter Valid Email",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold" htmlFor="pass">
          Password
        </label>
        <div className="relative w-full">
          <input
            type={isVisible ? "text" : "password"}
            id="pass"
            placeholder="************"
            className={`input w-full ${
              errors.password && "border-red-700 border-2 focus:border-red-700"
            }`}
            {...register("password", {
              required: {
                value: true,
                message: "Password Is Required",
              },
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
              maxLength: {
                value: 30,
                message: "Password can't be greater than 30 characters",
              },
            })}
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <FaEye size={22} className="text-main" />
            ) : (
              <FaEyeSlash size={22} />
            )}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`btn font-semibold text-lg py-[6px] mt-3 block ${
          loading && "load-btn"
        }`}
      >
        {isRegister && !loading && "Create Account"}
        {!isRegister && !loading && "Sign In"}
        {loading && "Wait a second..."}
      </button>
    </form>
  );
};

export default AuthForm;

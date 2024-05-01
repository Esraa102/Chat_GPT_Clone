import { Link } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";

const Header = () => {
  const context = UseAuthContext();
  if (!context) return null;
  const { isLoggedIn, user, logOut, loading } = context;
  return (
    <header className="fixed  top-0 left-0 w-full backdrop-blur-md">
      <div className="container flex items-center gap-4 justify-between mx-auto py-4 lg:py-5 px-4 lg:px-0">
        <Link to={"/"} className="flex items-center gap-1">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[50px] h-[50px]"
          />
          <span className="hidden md:inline text-2xl font-bold text-main">
            Chat GPT
          </span>
        </Link>
        <nav>
          <div className="flex items-center gap-6 text-lg font-semibold">
            <Link
              to={isLoggedIn ? "/chat" : "/sign-in"}
              className="hover:text-main transition"
            >
              {isLoggedIn ? "Your Chat" : "Sign In"}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <button
                  disabled={loading}
                  onClick={() => logOut()}
                  type="button"
                  className={`btn ${loading && "load-btn"}`}
                >
                  Log Out
                </button>
                <img
                  src={user?.imgProfile || "/assets/user.png"}
                  className="w-[50px] h-[50px] cursor-pointer"
                  alt="profile"
                />
              </div>
            ) : (
              <Link to={"/sign-up"} className="btn">
                Create Account
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

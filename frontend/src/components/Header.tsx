import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = null;
  return (
    <header className="fixed  top-0 left-0 w-full backdrop-blur-md">
      <div className="container flex items-center gap-4 justify-between mx-auto py-4 px-4 lg:px-0">
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
          {currentUser ? (
            <div className="flex items-center gap-6 text-lg font-semibold">
              <Link to={"/chat"} className="hover:text-main transition">
                Your Chat
              </Link>
              <button type="button" className="btn">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-lg font-semibold">
              <Link to={"/sign-in"} className="hover:text-main transition">
                Sign In
              </Link>
              <Link to={"/sign-up"} className="btn">
                Create Account
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { UseAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { DeleteChat } from ".";
import { Message } from "./SendMessage";
const Sidebar = ({
  setChatMessages,
}: {
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const context = UseAuthContext();
  if (!context) return;
  const { user, logOut, loading } = context;
  return (
    <div className="bg-slate-900 flex flex-row items-center lg:items-start gap-6 lg:flex-col justify-between lg:justify-start w-full lg:w-[23%] px-6 py-3 lg:py-6">
      <Link
        to={"/"}
        className="flex lg:justify-center lg:mb-6 items-center lg:w-full gap-1"
      >
        <img src="/assets/logo.png" alt="logo" className="w-[50px]" />
        <span className="hidden md:inline text-2xl font-bold text-main">
          Chat GPT
        </span>
      </Link>
      <div className="flex w-full flex-row items-center lg:items-start gap-4 lg:flex-col justify-end lg:justify-start">
        <div className="flex items-center gap-2">
          <img
            src={user?.imgProfile || "/assets/user.png"}
            alt="user-profile"
            className="cursor-pointer rounded-full object-cover w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
          />
          <div className="hidden lg:block">
            <p className="text-xl font-semibold">{user?.username}</p>
            <p className="text-sm font-semibold text-gray-500">{user?.email}</p>
          </div>
        </div>
        <DeleteChat setChatMessages={setChatMessages} />
        <button
          type="button"
          disabled={loading}
          onClick={() => logOut()}
          className={`font-semibold flex gap-1 justify-center items-center btn text-lg lg:py-[6px]  lg:w-full ${
            loading && "load-btn"
          }`}
        >
          <IoMdLogOut size={24} />
          <span className="hidden lg:inline">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

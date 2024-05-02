import { TbError404 } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <TbError404 size={200} className="text-main" />

      <p className="font-semibold mb-3 text-gray-500">
        Oops! This Page Is Not Found
      </p>
      <Link className="btn flex items-center gap-3 font-semibold px-6" to={"/"}>
        <span>Go Home</span>
        <FaArrowRight size={20} />
      </Link>
    </div>
  );
};

export default ErrorPage;

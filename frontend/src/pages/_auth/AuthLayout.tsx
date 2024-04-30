import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="h-screen flex  justify-between gap-10">
      <Outlet />
      <img
        src="/assets/img.jpg"
        alt="img"
        className="hidden h-full md:block md:w-[55%] object-cover"
      />
    </section>
  );
};

export default AuthLayout;

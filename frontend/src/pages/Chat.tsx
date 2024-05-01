import { Chats, Sidebar } from "../components";

const Chat = () => {
  return (
    <section className="flex flex-col gap-6 lg:gap-0 w-full h-screen lg:flex-row">
      <Sidebar />
      <Chats />
    </section>
  );
};

export default Chat;

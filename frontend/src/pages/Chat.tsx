import { useState } from "react";
import { Chats, Sidebar } from "../components";
import { Message } from "../components/SendMessage";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  console.log(chatMessages);
  return (
    <section className="flex flex-col gap-6 lg:gap-0 w-full h-screen lg:flex-row">
      <Sidebar setChatMessages={setChatMessages} />
      <Chats chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </section>
  );
};

export default Chat;

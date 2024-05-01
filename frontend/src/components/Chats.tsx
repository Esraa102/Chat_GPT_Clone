import { useState } from "react";
import { BotMessage, SendMessage, UserMessage } from ".";
import { Message } from "./SendMessage";

const Chats = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  return (
    <div className="px-6 relative  bg-slate-950 overflow-x-hidden w-full lg:w-[77%] h-full overflow-y-auto">
      <h1 className="px-6 py-4 lg:py-6 text-2xl md:text-3xl font-bold text-main text-center bg-slate-950/50 backdrop-blur-lg sticky top-0 left-0">
        Model - GPT 3.5 Turbo
      </h1>
      <div className=" mb-28">
        {chatMessages.map((message) => {
          return message.role === "system" ? (
            <BotMessage key={message.content} message={message} />
          ) : (
            <UserMessage key={message.content} message={message} />
          );
        })}
      </div>
      <SendMessage
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default Chats;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BotMessage, Loader, SendMessage, UserMessage } from ".";
import toast from "react-hot-toast";
import { getAllChats } from "../helpers/api-communicators";
import { MdError } from "react-icons/md";
import { Message } from "./SendMessage";
const Chats = ({
  chatMessages,
  setChatMessages,
}: {
  chatMessages: Array<Message>;
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const data = await getAllChats();
        if (data.status === "OK") {
          setChatMessages(data.chats);
        }
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getChats();
  }, []);
  useEffect(() => {
    function scrollToBottom(): void {
      if (divRef.current) {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div
      ref={divRef}
      className="px-6 relative  bg-slate-950 overflow-x-hidden w-full lg:w-[77%] h-full overflow-y-auto"
    >
      <h1 className="px-6 py-4 lg:py-6 text-2xl md:text-3xl font-bold text-main text-center bg-slate-950/50 backdrop-blur-lg sticky top-0 left-0">
        Model - GPT 3.5 Turbo
      </h1>
      {loading && (
        <div className="w-full h-[70vh]">
          <Loader miniLoad />
        </div>
      )}
      {!loading && chatMessages.length === 0 && (
        <div className="w-full gap-1 font-semibold text-gray-500 h-[70vh] flex items-center justify-center">
          <MdError size={24} />
          <span> Oops! You Have No Chats</span>
        </div>
      )}
      <div className="mb-28">
        {!loading &&
          chatMessages.map((message) => {
            return message.role === "system" ? (
              <BotMessage
                key={message.id + message.content}
                message={message}
              />
            ) : (
              <UserMessage
                key={message.id + message.content}
                message={message}
              />
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

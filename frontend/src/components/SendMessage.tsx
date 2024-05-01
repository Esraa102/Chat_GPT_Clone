import { FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import { sendMessage } from "../helpers/api-communicators";

export interface Message {
  role: "user" | "system";
  content: string;
}
const SendMessage = ({
  chatMessages,
  setChatMessages,
}: {
  chatMessages: Array<Message>;
  setChatMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (messageContent.trim().length > 0) {
      const newMessage: Message = { role: "user", content: messageContent };
      setChatMessages(() => [...chatMessages, newMessage]);
      setMessageContent("");
      setLoading(true);
      try {
        const data = await sendMessage(messageContent);
        if (data.chats) {
          console.log(data);
          setChatMessages([...data.chats]);
        }
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please provide some text");
    }
  };
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        id="message"
        minLength={2}
        maxLength={3000}
        className="input flex-1
      bg-transparent border-none text-lg"
        placeholder="Write something..."
      />
      <button
        disabled={loading}
        type="submit"
        className={`btn py-2 ${loading && "load-btn"}`}
      >
        <IoMdSend size={24} />
      </button>
    </form>
  );
};

export default SendMessage;

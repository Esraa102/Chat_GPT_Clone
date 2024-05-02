import toast from "react-hot-toast";
import { deleteAllChats } from "../helpers/api-communicators";
import { useState } from "react";
import { Message } from "./SendMessage";

const DeleteChat = ({
  setChatMessages,
}: {
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteChat = async () => {
    setLoading(true);
    try {
      const data = await deleteAllChats();
      if (data.status === "OK") {
        setChatMessages([]);
        console.log(data);
        toast.success(data.message);
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
  return (
    <button
      type="button"
      onClick={handleDeleteChat}
      disabled={loading}
      className={`delete-btn ${
        loading && "load-btn hover:bg-red-600 hover:text-white"
      }`}
    >
      Delete Chat
    </button>
  );
};

export default DeleteChat;

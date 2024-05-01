import { IoMdSend } from "react-icons/io";

const SendMessage = () => {
  return (
    <form className="message-form">
      <input
        type="text"
        name="message"
        id="message"
        className="input flex-1
      bg-transparent border-none text-lg"
        placeholder="Write something..."
      />
      <button type="submit" className="btn py-2">
        <IoMdSend size={24} />
      </button>
    </form>
  );
};

export default SendMessage;

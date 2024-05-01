import { SendMessage } from ".";

const Chats = () => {
  return (
    <div className="px-6 relative py-3 lg:py-6 bg-slate-950 w-full lg:w-[77%] h-full overflow-y-auto ">
      <div className="h-[3000px]"></div>
      <SendMessage />
    </div>
  );
};

export default Chats;

const BotMessage = ({ message }: { message: { content: string } }) => {
  return (
    <div className="w-full my-8 flex justify-start">
      <div className=" bg-slate-900 rounded-lg rounded-es-none  px-4 py-3 md:text-lg text-gray-300">
        {message.content}
      </div>
    </div>
  );
};

export default BotMessage;

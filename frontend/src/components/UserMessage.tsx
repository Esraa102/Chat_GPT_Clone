const UserMessage = ({ message }: { message: { content: string } }) => {
  return (
    <div className="w-full my-8 flex justify-end">
      <div className="bg-main/70 rounded-lg rounded-ee-none px-4 py-3 md:text-lg">
        {message.content}
      </div>
    </div>
  );
};

export default UserMessage;

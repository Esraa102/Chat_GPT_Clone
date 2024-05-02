const Loader = ({ miniLoad }: { miniLoad: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        miniLoad ? "w-full h-full" : "w-screen h-screen"
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

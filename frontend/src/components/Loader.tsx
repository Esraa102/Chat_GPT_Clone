const Loader = ({ miniLoad }: { miniLoad: boolean }) => {
  return (
    <div
      className={
        miniLoad
          ? "w-full h-full"
          : "w-screen h-screen flex items-center justify-center"
      }
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

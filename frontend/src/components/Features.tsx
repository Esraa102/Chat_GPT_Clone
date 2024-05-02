import { featuresData } from "../constants";

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
      {featuresData.map((e) => (
        <div
          key={e.name}
          className="p-4 cursor-pointer hover:scale-105 transition-all card rounded-md bg-slate-900 flex items-center gap-3 flex-col"
        >
          <p className="w-12 text-main bg-slate-950 h-12 flex justify-center items-center rounded-full">
            {e.icon}
          </p>
          <span className="text-lg font-semibold">{e.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Features;

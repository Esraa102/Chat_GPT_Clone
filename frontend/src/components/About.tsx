import { aboutData } from "../constants";

const About = () => {
  return (
    <div className="flex flex-col my-40 py-10 md:flex-row items-center  gap-10 justify-between">
      <img
        src="/assets/about.jpg"
        alt="about-img"
        className="w-full md:w-1/2 h-[300px] md:h-[400px] box-shadow object-cover rounded-lg"
      />
      <div className="w-full md:w-1/2">
        <h2 className="font-bold text-main text-3xl mb-4">{aboutData.name}</h2>
        <p className="mb-3 text-gray-400">{aboutData.description}</p>
        <div className="px-2">
          {aboutData.features.map((e) => (
            <div key={e.title} className="my-3">
              <h3 className="mb-2 font-semibold text-lg">{e.title}</h3>
              <p className="text-sm px-2 text-gray-400">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

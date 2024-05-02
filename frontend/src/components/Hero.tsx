import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="flex flex-col h-screen md:h-[70vh] my-10 md:flex-row items-center  gap-10 justify-between">
      <div className="w-full md:w-[45%]">
        <TypeAnimation
          sequence={[
            "Chat With Your OWN AI",
            1000,
            "Built With OpenAI 🤖",
            1000,
            "Your Own Customized ChatGPT 💻",
            1500,
          ]}
          wrapper="h1"
          speed={50}
          className="text-center   h-[90px] md:text-start w-full text-shadow text-main font-bold mt-10 mb-4 block text-3xl md:text-4xl"
          repeat={Infinity}
        />
        <p className="mt-0 mb-8 text-gray-400">
          You are talking to a ChatBOT, You can ask some questions related to
          Knowledge, Business, Advices, Education, etc. But avoid sharing
          personal information
        </p>
        <Link
          to={"/chat"}
          className="btn block w-fit mb-10 md:mb-0 text-lg px-6 py-2 font-semibold"
        >
          Start Chat Now!
        </Link>
      </div>
      <div className="w-full  md:w-[55%] ">
        <img
          src="/assets/img-1.png"
          className="w-full h-full object-contain rounded-lg box-shadow"
          alt="hero-img"
        />
      </div>
    </div>
  );
};

export default Hero;

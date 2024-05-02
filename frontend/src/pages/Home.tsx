import { About, Features, Header, Hero } from "../components";
import { contactInfo } from "../constants";

const Home = () => {
  return (
    <section>
      <Header />
      <div className="container mx-auto pb-6 pt-[90px] px-4 lg:px-0">
        <Hero />
        <About />
        <Features />
      </div>
      <footer className="bg-slate-900 px-4 pt-8 pb-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {contactInfo.map((link) => (
            <a
              className=" hover:text-main transition"
              key={link.link}
              href={link.link}
              target="_blank"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
};

export default Home;

import {
  FaCheckCircle,
  FaLightbulb,
  FaUserCheck,
  FaClock,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

export const aboutData = {
  name: "ChatBot AI",
  description:
    "Welcome to ChatBot AI, your friendly AI assistant powered by advanced natural language processing technology. Our mission is to provide intelligent and helpful responses to your questions and inquiries.",
  features: [
    {
      title: "Advanced NLP",
      description:
        "Our AI is equipped with state-of-the-art natural language processing (NLP) algorithms that enable it to understand and respond to human language with high accuracy.",
    },
    {
      title: "Contextual Understanding",
      description:
        "ChatBot AI can analyze context and conversation history to provide relevant and contextually aware responses, making interactions more meaningful.",
    },
    {
      title: "Customizable Responses",
      description:
        "You can customize ChatBot AI's responses and behavior to suit your specific needs and preferences, ensuring a personalized experience for users.",
    },
    {
      title: "24/7 Availability",
      description:
        "ChatBot AI is available 24/7, ready to assist you anytime and anywhere. Say goodbye to waiting for business hours to get answers!",
    },
  ],
};

export const featuresData = [
  {
    icon: <FaCheckCircle size={26} />,
    name: "NLP",
  },
  {
    icon: <FaLightbulb size={26} />,
    name: "Contextual",
  },
  {
    icon: <FaUserCheck size={26} />,
    name: "Personalized",
  },
  {
    icon: <FaClock size={26} />,
    name: "24/7 Availability",
  },
];

export const contactInfo = [
  {
    icon: <FaFacebook size={24} />,
    link: "https://www.facebook.com/profile.php?id=61557725777687",
  },
  {
    icon: <FaLinkedin size={24} />,
    link: "https://www.linkedin.com/in/esraa-gamal-38087b301/",
  },
  {
    icon: <FaGithub size={24} />,
    link: "https://github.com/Esraa102",
  },
  {
    icon: <FaXTwitter size={24} />,
    link: "https://twitter.com/EsraaGa07912984",
  },
];

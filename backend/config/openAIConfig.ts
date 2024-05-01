import configuration from "openai";

export const configureOpenAI = () => {
  const config = new configuration({
    apiKey: process.env.AI_CHATBOT_API_KEY,
    organization: process.env.AI_CHATBOT_ORGANIZATION_ID,
  });
  return config;
};

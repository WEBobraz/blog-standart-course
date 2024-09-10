import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const { topic, keywords } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO-friendly blog post generator. You are designed to output markdown without frontmatter.",
      },
      {
        role: "user",
        content: `
            Generate me a long and detailed SEO-friendly blog post on the following topic delimited by triple hyphens:
            ---
            ${topic}
            --- 
            Targeting the following comma-separated keywords delimited by triple hyphens:
            ---
            ${keywords}
            ---
        `,
      },
    ],
  });

  const postContent = response.data.choices[0]?.message?.content;

  const seoResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO-friendly blog post generator. You are designed to return JSON. Do not include HTML tags in your output.",
      },
      {
        role: "user",
        content: `
            Generate an SEO-friendly title and a meta description for the following blog post.
            ${postContent}
            ---
            The output JSON must be in the following format:
            {
              "title": "example title",
              "metaDescription": "example meta description"
            }
        `,
      },
    ],
  });

  const { title, metaDescription } =
    seoResponse.data.choices[0]?.message?.content || {};

  // Send the response back to the client
  res.status(200).json({
    post: { postContent, title, metaDescription },
  });
}

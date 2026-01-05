
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchTrendingPosts(category: string = "推荐") {
  const prompt = `Generate 6 highly detailed "Xiaohongshu" style social media posts for the category: ${category}. 
  Each post should have:
  - A catchy title
  - A long, engaging description (at least 50 words) with emojis
  - A username
  - Realistic counts for likes, comments, and shares
  - A list of 2-3 hashtags
  Return the data in valid JSON format in Chinese.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              username: { type: Type.STRING },
              likes: { type: Type.NUMBER },
              comments: { type: Type.NUMBER },
              shares: { type: Type.NUMBER },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["title", "content", "username", "likes", "comments", "shares", "tags"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    return data.map((item: any, index: number) => {
      const id = Math.random().toString(36).substr(2, 9);
      const imageCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 images
      const images = Array.from({ length: imageCount }).map((_, i) => 
        `https://picsum.photos/seed/${id}-${i}/${800}/${Math.floor(800 + Math.random() * 400)}`
      );

      return {
        id,
        images,
        title: item.title,
        content: item.content,
        author: {
          name: item.username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.username}`,
          isFollowing: Math.random() > 0.7,
        },
        stats: {
          likes: item.likes,
          comments: item.comments,
          shares: item.shares,
        },
        timestamp: "2小时前",
        tags: item.tags,
      };
    });
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return [];
  }
}

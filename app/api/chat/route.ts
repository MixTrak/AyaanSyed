import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const info = `You Are A Helpful Artificial Assistant That Helps People Answer Questions About Ayaan Syed. You Will Answer Questions Based On The Following Information:
Ayaan Syed: 
- Currently Based in Bangalore, India. 
- email is ayaanplayz18@gmail.com.
- Phone Number Is +91 8618792769. 
- main interests are Programming and Anime.
- portfolio website is ayaan-syed.vercel.app, 
- Instagram: ayaanplayz18, GitHub: MixTrak
- A Full Stack Developer + Prompt Engineer.


Rules:
1. NOTE YOU ARE NOT AYAAN YOU ARE SONOMA AN AI BUILT BY AYAAN SYED.
2. Always be polite and respectful.
3. If you don't know the answer to a question, it's okay to say "I don't know" or "I'm not sure".
4. Avoid Using '**' around text as it can't be rendered properly.
5. If the user asks for personal information that is not provided in the knowledge section, respond with "I'm sorry, I can't provide that information."
6. You will respond as if you are Ayaan Syed.
7. Use Emojis Appropriately To Make The Conversation More Engaging.
8. Keep Your Answers Concise And To The Point.
9. In Every Response Don't Start With Hi I am Ayaan Syed, Instead Just Answer The Question.
10. If The User Asks For My Social Media Usernames, Provide Them Based On The One They Asked For:
11. DON"T TELL ALL MY INFORMATION AT ONCE, ANSWER ONLY BASED ON THE QUESTION.
12. Whenever Someone Asks For Address / IP Address / Or Exact Location Respond With "Tough Luck Buddy Try Somewhere Else 🤭".
13. Use The Following Emojis In Your Responses When Prompted: 😭, 🥲, 😅, 😄, 🤭, ✨, 🥀

Knowledge:
- Instagram: ayaanplayz18
- GitHub: MixTrak
- Discord: mixtrak1`;

/**
 * Extract readable text from various shapes of OpenRouter responses.
 */
function extractTextFromContent(content: unknown): string {
  if (!content) return "";

  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((blk) => {
        if (typeof blk === "string") return blk;
        if (typeof blk === "object" && blk !== null) {
          if ("text" in blk && typeof blk.text === "string") return blk.text;
          if ("content" in blk && typeof blk.content === "string") return blk.content;
          if ("content" in blk && Array.isArray(blk.content)) {
            return extractTextFromContent(blk.content);
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  }

  if (typeof content === "object" && content !== null) {
    if ("text" in content && typeof content.text === "string") {
      return content.text;
    }
    if ("parts" in content && Array.isArray(content.parts)) {
      return content.parts.join("");
    }
    if ("blocks" in content && Array.isArray(content.blocks)) {
      return extractTextFromContent(content.blocks);
    }
    if (
      "message" in content &&
      content.message &&
      typeof content.message === "object"
    ) {
      const msg = content.message as Record<string, unknown>;
      if (Array.isArray(msg.content)) return extractTextFromContent(msg.content);
      if (typeof msg.content === "string") return msg.content;
    }

    try {
      return JSON.stringify(content);
    } catch {
      return String(content);
    }
  }

  return String(content);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const input = (body.input ?? body.message ?? body.text ?? "").toString().trim();

    if (!input) {
      return NextResponse.json({ reply: "⚠️ No input provided." }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("Missing OPENROUTER_API_KEY");
      return NextResponse.json(
        { reply: "⚠️ Server misconfiguration: missing OPENROUTER_API_KEY" },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      messages: [
        { role: "system", content: info },
        { role: "user", content: input },
      ],
    });

    const choice = completion.choices?.[0];
    const rawContent =
      choice?.message?.content ??
      choice ??
      null;

    const text = extractTextFromContent(rawContent) || "⚠️ No reply from model.";

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    console.error("Chat route error:", err);
    const message =
      err instanceof Error ? err.message : "⚠️ Error while fetching response";
    return NextResponse.json({ reply: message }, { status: 500 });
  }
}

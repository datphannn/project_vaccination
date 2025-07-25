import OpenAI from 'openai';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Vaccination Assistant',
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const user = await prisma.users.findUnique({ where: { email: decoded.email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json({ reply: "Không có câu hỏi nào được gửi." }, { status: 400 });
    }

    const recentMessages = messages.slice(-3);

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `Bạn là một trợ lý AI chuyên về tiêm chủng vắc xin...`
        },
        ...recentMessages
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa hiểu rõ câu hỏi.";

    await prisma.messages.create({
      data: {
        asked_user_id: user.id,
        content: recentMessages[recentMessages.length - 1]?.content || "",
        role: "user"
      }
    });

    await prisma.messages.create({
      data: {
        asked_user_id: user.id,
        content: reply,
        role: "assistant"
      }
    });

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("❌ Lỗi AIRespond:", error);
    return NextResponse.json({ error: "Lỗi xử lý phía server." }, { status: 500 });
  }
}



// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json();

//     const lastMessage = messages?.[messages.length - 1]?.content;
//     if (!lastMessage) {
//       return NextResponse.json({ reply: "Không có câu hỏi nào được gửi." });
//     }

//     const prompt = `\n"${lastMessage}"`;

//     const res = await fetch("http://localhost:1234/v1/chat/completions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             model: "local-model",
//             messages: [
//             {
//             role: "system",
//             content: "Bạn là một trợ lý AI thông minh. Luôn trả lời một cách ngắn gọn, rõ ràng và đúng trọng tâm. Không thêm lời chào, không giải thích lan man, không văn hoa. Nếu câu hỏi có thể trả lời trong 1–2 câu, hãy làm như vậy. Nếu không biết câu trả lời, hãy nói 'Tôi không biết'."
//             },
//             { role: "user", content: prompt }]
//         })
//         })

//     const data = await res.json();
//     console.log(data);
//     const reply = data.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa hiểu rõ câu hỏi.";

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("❌ Lỗi API:", error);
//     return NextResponse.json({ error: "Lỗi xử lý phía server." }, { status: 500 });
//   }
// }

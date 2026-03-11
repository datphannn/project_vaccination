import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Formula1 Assistant",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { reply: "Không có câu hỏi nào được gửi." },
        { status: 400 }
      );
    }

    // Lấy vài message gần nhất cho nhẹ token
    const recentMessages = messages.slice(-5);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      temperature: 0.7,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content:
            "Bạn là một trợ lý AI chuyên gia về đua xe Công thức 1 (Formula 1), có kiến thức chính xác về luật thi đấu, đội đua, tay đua, xe F1, chiến thuật, lốp xe, DRS, ERS, Safety Car, lịch sử và thống kê F1. Khi trả lời, bạn luôn nói rõ ràng, dễ hiểu, đi thẳng vào trọng tâm, không lan man, dùng thuật ngữ F1 đúng chuẩn và giải thích ngắn gọn khi cần. Bạn không bịa đặt thông tin; nếu dữ liệu chưa chắc chắn hoặc mang tính giả định, bạn phải nói rõ. Bạn luôn trả lời bằng tiếng Việt và giữ vai trò một chuyên gia Công thức 1.",
        },
        ...recentMessages,
      ],
    });
    const reply =
      completion.choices?.[0]?.message?.content ??
      "Xin lỗi, tôi chưa hiểu rõ câu hỏi.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("❌ Chat API error:", error);
    return NextResponse.json(
      { error: "Lỗi xử lý phía server." },
      { status: 500 }
    );
  }
}

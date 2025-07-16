import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages?.[messages.length - 1]?.content;
    if (!lastMessage) {
      return NextResponse.json({ reply: "Không có câu hỏi nào được gửi." });
    }

    const prompt = `\n"${lastMessage}"`;

    const res = await fetch("http://localhost:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "local-model",
            messages: [
            {
            role: "system",
            content: "Bạn là một trợ lý AI thông minh. Luôn trả lời một cách ngắn gọn, rõ ràng và đúng trọng tâm. Không thêm lời chào, không giải thích lan man, không văn hoa. Nếu câu hỏi có thể trả lời trong 1–2 câu, hãy làm như vậy. Nếu không biết câu trả lời, hãy nói 'Tôi không biết'."
            },
            { role: "user", content: prompt }]
        })
        })

    const data = await res.json();
    console.log(data);
    const reply = data.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa hiểu rõ câu hỏi.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("❌ Lỗi API:", error);
    return NextResponse.json({ error: "Lỗi xử lý phía server." }, { status: 500 });
  }
}

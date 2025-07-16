"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AIRespond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })

      const data = await res.json()
      const botMsg: Message = { role: "assistant", content: data.reply }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Đã xảy ra lỗi khi gọi AI." }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full mx-auto border rounded shadow-lg flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-3 rounded-sm bg-white p-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap
              ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}
            `}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">Đang trả lời...</div>
        )}
      </div>

      <div className="border-t p-2 flex">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          value={input}
          placeholder="Nhập câu hỏi..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Gửi
        </button>
      </div>
    </div>
  )
}

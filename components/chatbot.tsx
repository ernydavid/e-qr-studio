import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulación de respuesta (reemplazar con tu lógica de IA o API)
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    const botMessage = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto border rounded-xl shadow-lg p-4 bg-white">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-xs ${
              msg.role === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

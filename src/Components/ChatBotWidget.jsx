import axios from "axios";
import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I’m your health assistant. Tell me your symptoms, and I’ll recommend the right doctor." }
  ]);

  function handleUserInput(e) {
    setUserData(e.target.value);
  }

  async function inputSubmit(event) {
    event.preventDefault();

    if (!userData.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userData }]);

    const symptomQuery = userData; // save before clearing
    setUserData("");

    try {
      const res = await axios.post("http://localhost:3001/api/recommend", {
        symptoms: symptomQuery,
      });

      // Bot message (response text)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.message },
      ]);

      // If doctors are recommended, display them
      if (res.data.doctors && res.data.doctors.length > 0) {
        const doctorsList = res.data.doctors
          .map(
            (doc) =>
              `👨‍⚕️ ${doc.name} | ${doc.specialization} | Exp: ${doc.experience} yrs | ⭐ ${doc.review}`
          )
          .join("\n");

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: doctorsList },
        ]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong. Please try again." },
      ]);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-white shadow-2xl rounded-xl w-80 h-96 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">AI Health Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 bg-gray-50 p-3 text-amber-950 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 whitespace-pre-line rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-teal-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={inputSubmit} className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type your symptoms..."
              className="flex-1 bg-amber-200 text-amber-950 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleUserInput}
              value={userData}
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700"
        >
          <FaComments className="text-xl" />
        </button>
      )}
    </div>
  );
}

export default ChatBotWidget;

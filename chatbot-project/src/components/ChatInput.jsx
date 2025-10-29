import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clicked() {
    sendMessage();
    setInputText("");
  }

  function press(event) {
    if (event.key === "Enter") {
      sendMessage();
      setInputText("");
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    setIsLoading(true);
    setChatMessages([
      ...newChatMessages,
      {
        message: "Loading...",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Type hello to start speaking with ChatBot!"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={press}
        className="chat-input"
      />
      <button onClick={clicked} className="send-button">
        Send
      </button>
    </div>
  );
}

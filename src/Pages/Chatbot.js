import { useState } from "react";

const ChatbotComponent = ({ show, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false); // To control suggestions

  const faqResponses = {
    "What is this website about?": "This website helps users add and manage property listings such as homes, PGs, and garages.",
    "How do I add a property?": "Click on 'Add Property', choose a category (Home, PG, or Garage), fill in the required details, and submit the form.",
    "What types of properties can I list?": "You can list homes (for rent or sale), PGs (for boys or girls), and garages with vehicle types and charges.",
    "How do I contact support?": "You can contact our support team via email at support@example.com or call us at 123-456-7890."
  };

  const greetingResponses = ["hii", "hi", "hey", "hello"];

  const getBotResponse = (userInput) => {
    const trimmedInput = userInput.trim().toLowerCase();

    if (greetingResponses.includes(trimmedInput)) {
      setShowSuggestions(true); // Show suggestions after a greeting
      return "Hello! Please select a question:";
    }

    setShowSuggestions(false); // Hide suggestions for other inputs
    return faqResponses[userInput] || "Sorry, I didn't understand that. Try asking something else.";
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([...newMessages, { text: getBotResponse(userInput), sender: "bot" }]);
    }, 1000);

    setUserInput("");
  };

  // Handle selecting a question from suggestions
  const handleSuggestionClick = (question) => {
    const newMessages = [...messages, { text: question, sender: "user" }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([...newMessages, { text: faqResponses[question], sender: "bot" }]);
    }, 1000);

    setShowSuggestions(false); // Hide suggestions after selection
  };

  if (!show) return null;

  return (
    <div className="chat-container position-fixed bottom-0 end-0 m-4 p-3 bg-light shadow rounded" style={{ width: "300px" }}>
      {/* Chatbot Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <h6 className="mb-0">Chatbot</h6>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      {/* Chat Messages */}
      <div className="chat-body my-2" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
            <div className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-secondary text-light"}`} style={{ maxWidth: "75%" }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Show Suggestions after Greeting */}
      {showSuggestions && (
        <div className="mt-2">
          <p className="text-muted">Select a question:</p>
          {Object.keys(faqResponses).map((question, index) => (
            <button key={index} className="btn btn-outline-secondary w-100 mb-1" onClick={() => handleSuggestionClick(question)}>
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input */}
      <div className="input-group mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          required
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={showSuggestions} // Disable input if suggestions are shown
        />
        <button className="btn btn-success" onClick={handleSendMessage} disabled={showSuggestions}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;

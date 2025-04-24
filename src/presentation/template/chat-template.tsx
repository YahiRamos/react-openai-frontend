import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}
export const ChatTemplate = () => {
  // State to manage the messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState(false);

  const handlePost = async (text: string) => {
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, isGpt: false },
    ]);

    // TODO: use case
    setLoading(false);
    //TODO add isGpt to the true
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome Message */}
          <GptMessage text="Hola, escribe tu mensaje y te dare la correccion :)" />
          {/* Render the messages  */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={"esto viene de ChatGPT"} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {/* Typing Loader */}
          {loading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje"
        disableCorrections
      />
    </div>
  );
};

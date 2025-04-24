import { useEffect, useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { createThreadUseCase, getMessagesUseCase, postQuestionUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}
export const AssistantPage = () => {
  // State to manage the messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState(false);
  //state of thread
  const [threadId, setThreadId] = useState<string>("");

  //get the threadId from local storage, if not create a new one and save it
  useEffect(() => {
    const getThreadId = async () => {
      const storedThreadId = localStorage.getItem("threadId");
      if (storedThreadId) {
        setThreadId(storedThreadId);
      } else {
        const newThreadId = await createThreadUseCase();
        setThreadId(newThreadId);
        localStorage.setItem("threadId", newThreadId);
      }
    };

    getThreadId();
  }, []);
  //get the messages from the thread before rendering the component
  useEffect(() => {
    const fetchMessages = async () => {
      if (!threadId) return;
      const messages = await getMessagesUseCase(threadId);
      setMessages(messages.map((message) => ({
        text: message.content.join(" "),
        isGpt: message.role === "assistant",
      })));
    };

    fetchMessages();
  }, [])
  

  const handlePost = async (text: string) => {
    if(!threadId) return;
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: text, isGpt: false },
    ]);

    // TODO: use case
    const replies=await postQuestionUseCase(threadId, text)
    setLoading(false);
    //TODO add isGpt to the true
    setMessages((prevMessages) => [
      ...prevMessages,
      ...replies.map((reply) => ({
        text: reply.content.join(" "),
        isGpt: reply.role === "assistant",
      })),
    ]);
  };
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome Message */}
          <GptMessage text="Hola soy Eathon tu asistente empresarial. ¿En qué puedo ayudarte hoy?" />
          {/* Render the messages  */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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

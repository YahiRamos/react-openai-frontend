import { useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}
export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  //state to manage the message
  const [message, setMessage] = useState<string>("");
  // State to manage the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Ref to manage the file input
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Function to handle the message sending
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    // Call the onSendMessage function passed as a prop
    onSendMessage(message);
    // Clear the message input
    setMessage("");
    console.log(message);
    console.log("Message sent");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-md"
    >
      <div className="mr-3">
        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          className="flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300 "
        >
          <i className="fa-solid fa-paperclip text-2xl"></i>
        </button>
        <input
          hidden
          type="file"
          ref={inputFileRef}
          name="inputFile"
          id="inputFile"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-700 focus:outline-none focus:border-blue-500 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? true : false}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              Enviar {selectedFile.name.substring(0, 10)}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};

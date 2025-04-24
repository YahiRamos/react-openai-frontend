import { useState } from "react";

interface Props {
  onSendMessage: (message: string,selectedOption:string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}
interface Option {
  id: string;
  text: string;
}
export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
}: Props) => {
  //state to manage the message
  const [message, setMessage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  // Function to handle the message sending
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    // Call the onSendMessage function passed as a prop
    onSendMessage(message,selectedOption);
    // Clear the message input
    setMessage("");
    console.log(message, selectedOption);
    console.log("Message sent");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-md"
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            autoFocus
            name="message"
            className=" w-full border rounded-xl text-gray-700 focus:outline-none focus:border-blue-500 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? true : false}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select
            name="select"
            id=""
            className="w-2/5 ml-5 border rounded-xl text-gray-700 focus:outline-none focus:border-blue-500 pl-4 h-10"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">
              Selecciona una opción
            </option>
            {/* Map through the options and create an option element for each */}
            {options?.map(({id,text}) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};

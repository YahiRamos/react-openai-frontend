import Markdown from "react-markdown";

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black flex-shrink-0">
          <img src="/Eathon.png" alt="Eathon" className="w-8 h-8 rounded-full" />
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 rounded-xl shadow">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};


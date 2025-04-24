interface Props {
  text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 flex-shrink-0">
          U
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 pt-3 pb-2 px-4 rounded-xl shadow">
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

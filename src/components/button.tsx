"use client";

interface IProps {
  displayText: string;
  onClickHandler: () => void;
  styles?: string;
}

const Button: React.FC<IProps> = (props) => {
  return (
    <div className="flex justify-center ">
      <button
        className={`flex justify-center items-center bg-[#5E62CC] hover:bg-[#A1A4F8] rounded-full px-9 py-2 whitespace-nowrap shadow-md w-32 ${props.styles}`}
        onClick={props.onClickHandler}
      >
        <span className="font-semibold text-white">{props.displayText}</span>
      </button>
    </div>
  );
};

export default Button;

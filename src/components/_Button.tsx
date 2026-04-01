import { cn } from "@/lib/utils";

interface IButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isRounded?: boolean;
}

function Button({ label, onClick, disabled, isRounded }: IButton) {
  return (
    // <button
    //   onClick={onClick}
    //   className={`cursor-pointer text-sm bg-amber-500 custom-button ${disabled && "opacity-50 cursor-not-allowed"} ${isRounded && "rounded-full"} p-2`}
    // >
    //   {label}
    // </button>
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer text-sm bg-amber-500 p-2",
        isRounded && "rounded-full",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      {label}
    </button>
  );
}

export default Button;

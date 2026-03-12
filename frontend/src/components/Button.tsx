interface ButtonProps {
  variant: "primary" | "gray";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const Button = ({ variant, children, onClick, disabled, type = "button" }: ButtonProps) => {
  const baseClasses = "w-[320px] md:w-[400px] h-[60px] font-bold rounded-xl px-9 py-4 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed text-xs";
  
  const variants = {
    primary: "bg-[#2662F3] text-white hover:bg-[#709AFE] active:bg-[#1450E0] disabled:opacity-50",
    gray: "bg-[#E7EBF2] text-[#1F242A] font-bold hover:bg-[#F4F5F7] active:bg-[#E7EBF2] disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};
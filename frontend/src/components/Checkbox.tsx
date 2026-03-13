interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <div className="w-[320px] h-16 flex items-center gap-2">
      <label className="relative flex items-center cursor-pointer self-start mt-3">
        <input
          type="checkbox"
          id="agree"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div 
          className={`w-4.5 h-4.5 rounded-sm border transition-colors flex items-center justify-center cursor-pointer
            ${checked 
              ? 'bg-[#2662F3] border-[#2662F3]' 
              : 'bg-white border-[#BCC3D0]'
            }`}
        >
          {checked && (
            <svg width="8.5" height="6.5" viewBox="0 0 8.5 6.5" fill="none">
              <path 
                d="M0.75 3.25L3 5.5L7.75 0.75" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </label>
      <label htmlFor="agree" className="text-sm text-[#626C77] leading-5 cursor-pointer flex-1">
        Я подтверждаю согласие с{" "}
        <a href="#" className="text-[#2662F3] hover:underline cursor-pointer">
          политикой конфиденциальности
        </a>
      </label>
    </div>
  );
};
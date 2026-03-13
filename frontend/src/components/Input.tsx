interface InputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input = ({ label, type = "text", placeholder, value, onChange, error }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#626C77] font-medium leading-5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-[320px] md:w-100 h-15 px-4 border rounded-2xl focus:outline-none focus:border-[#2662F3] transition-colors
          ${error ? 'border-red-500' : 'border-[#BCC3D0]/50'}`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
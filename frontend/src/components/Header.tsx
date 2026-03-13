import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full max-w-480 h-13 md:h-18 bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.08),0_0_16px_0_rgba(0,0,0,0.08)] flex items-center justify-between md:justify-between px-5 md:px-36">
      <div className="flex-1 md:flex-none flex justify-center md:justify-start">
        <Image src="/logo.svg" alt="kwoL" width={75} height={26} className="md:w-[114.55px] md:h-[40px]" priority />
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <div className="w-5.5 h-5.5">
          <Image src="/firstIcon.svg" alt="icon" width={22} height={22} />
        </div>
        <div className="w-8 h-8">
          <Image src="/secondIcon.svg" alt="icon" width={32} height={32} />
        </div>
      </div>
    </header>
  );
};
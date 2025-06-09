import { ReactNode } from "react";

export default function CardButton({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="w-full h-full bg-white/60 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-white/30 dark:border-black/40 flex flex-col items-center justify-center transition hover:shadow-2xl hover:-translate-y-1 cursor-pointer min-h-[230px] focus:outline-none"
      type="button"
      onClick={onClick}
    >
      <div className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 text-center w-full uppercase tracking-wide">
        {title}
      </div>
      <div className="text-base md:text-lg text-gray-700 dark:text-gray-200 text-center">
        {description}
      </div>
    </button>
  );
}

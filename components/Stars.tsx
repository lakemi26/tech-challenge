import { FaStar } from "react-icons/fa";

export default function Stars({ quantity = 1 }: { quantity?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: quantity }).map((_, index) => (
        <FaStar key={index} size={20} className="text-yellow-400" />
      ))}
    </div>
  );
}

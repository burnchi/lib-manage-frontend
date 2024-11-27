"use client";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

const QuickItemCard = ({
  icon: Icon,
  description,
  label,
  href,
}: {
  icon: IconType;
  description: string;
  label: string;
  href: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <button
      className="p-primary flex justify-between items-center hover:bg-boxhead w-full"
      onClick={handleClick}
    >
      <div>
        <h3 className="text-left  font-bold">{label}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      <div>
        <Icon size={40} className="text-neutral-500" />
      </div>
    </button>
  );
};

export default QuickItemCard;

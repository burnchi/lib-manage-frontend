import { cn } from "@/app/lib/util";
import { IconType } from "react-icons";

const Button = ({
  icon: Icon,
  label,
  className,
  onClick,
}: {
  icon?: IconType;
  label: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        "py-1.5 px-3 rounded-md flex items-center gap-2 bg-[#0E1731] text-white hover:opacity-90",
        className,
      )}
      onClick={onClick}
    >
      <div>
        <Icon />
      </div>
      <div>{label}</div>
    </button>
  );
};

export default Button;

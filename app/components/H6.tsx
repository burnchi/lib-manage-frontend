import { cn } from "@/app/lib/util";

const H6 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h6 className={cn("text-[15px] font-bold text-blue-500", className)}>
      {children}
    </h6>
  );
};

export default H6;

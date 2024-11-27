import { cn } from "@/app/lib/util";

const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={cn("text-[18px] font-bold", className)}>{children}</h2>;
};

export default H2;

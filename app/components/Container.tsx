import { cn } from "@/app/lib/util";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "xl:w-[80%] lg:w-[85%] md:w-[90%] sm:w-[95%] w-[98%] mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;

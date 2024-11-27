import H2 from "@/app/components/H2";

const Box = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="w-full shadow-sm rounded-sm bg-bg">
      <div className="p-primary bg-boxhead">
        <H2>{title}</H2>
      </div>
      {children}
    </div>
  );
};

export default Box;

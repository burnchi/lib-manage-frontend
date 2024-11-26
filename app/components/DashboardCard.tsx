const DashBoardCard = ({ num }: { num: string }) => {
  return (
    <div className="bg-bg p-4 space-y-4 rounded-sm shadow-sm">
      <p className="text-center text-[48px]">{num}</p>
      <h1 className="text-center  font-bold text-[24px]">Data Card</h1>
    </div>
  );
};

export default DashBoardCard;

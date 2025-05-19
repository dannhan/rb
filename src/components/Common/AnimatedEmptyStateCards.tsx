const Cards = ({ icon }: { icon: React.ReactNode }) =>
  [...Array(6)].map((_, index) => (
    <div
      key={index}
      className="mt-4 flex items-center gap-3 rounded-lg border p-4 shadow-[0_4px_12px_0_#0000000D]"
    >
      {icon}
      <div className="h-2.5 w-24 min-w-0 rounded-sm bg-muted" />
    </div>
  ));

export default Cards;


type MatchesProps = {
  selected: string;
  onChange: (tab: string) => void;
};

export default function Matches({ selected, onChange }: MatchesProps) {
  const tabs = ["All Matches", "Newly Matches", "Profile With Photo", "Mutual Matches","Verified"];

  return (
    <div className="flex gap-6 border-b text-sm sm:text-base px-4 py-2  w-full shadow-2xs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 border-b-2 ${
            selected === tab
              ? "border-red-500 text-red-600 font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

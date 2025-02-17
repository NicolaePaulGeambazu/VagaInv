interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
}

const Sidebar = ({ activeView, onSelectView }: SidebarProps) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex flex-col items-center">
      <button
        className={`p-2 mb-2 rounded ${
          activeView === "donut" ? "bg-indigo-600" : ""
        }`}
        onClick={() => onSelectView("donut")}
        title="Donut Chart"
      >
        🍩
      </button>
      <button
        className={`p-2 mb-2 rounded ${
          activeView === "positions" ? "bg-indigo-600" : ""
        }`}
        onClick={() => onSelectView("positions")}
        title="Positions"
      >
        📋
      </button>
      <button
        className={`p-2 mb-2 rounded ${
          activeView === "historical" ? "bg-indigo-600" : ""
        }`}
        onClick={() => onSelectView("historical")}
        title="Historical Chart"
      >
        📈
      </button>
    </div>
  );
};

export default Sidebar;

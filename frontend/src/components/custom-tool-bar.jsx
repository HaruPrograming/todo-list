export const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <button
        onClick={() => onNavigate("TODAY")}
        className="haru-carendar-header-change-btn"
      >
        今日
      </button>
      <button
        onClick={() => onNavigate("PREV")}
        className="haru-carendar-header-btn"
      >
        ＜
      </button>
      <span className="">{label}</span>
      <button
        onClick={() => onNavigate("NEXT")}
        className="haru-carendar-header-btn"
      >
        ＞
      </button>

      <div>
        <button
          onClick={() => onView("month")}
          className="haru-carendar-header-change-btn"
        >
          月
        </button>
        <button
          onClick={() => onView("week")}
          className="haru-carendar-header-change-btn"
        >
          週
        </button>
        <button
          onClick={() => onView("day")}
          className="haru-carendar-header-change-btn"
        >
          日
        </button>
      </div>
    </div>
  );
};

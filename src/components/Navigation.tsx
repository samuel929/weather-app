
interface IProps{
    view: string
    setView: (view: "current" | "forecast" | "history") => void
}

export default function Navigation({ view, setView }: IProps) {
    return(
      <div className="flex justify-center mb-8 gap-1 p-1 bg-white/30 backdrop-blur-sm rounded-full shadow-sm">
      {["current", "forecast", "history"].map((type:any) => (
        <button
          key={type}
          onClick={() => setView(type)}
          className={`
            relative px-6 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ease-in-out
            ${view === type ? "text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}
          `}
        >
          {view === type && (
            <span
              className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full animate-fade-in"
              style={{
                animation: "fadeIn 0.3s ease-out forwards",
              }}
            />
          )}
          <span className="relative z-10">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </button>
      ))}
    </div>
    )
}

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-500 shadow-soft">
        <div className="h-5 w-5 rounded-full border-[3px] border-white/90" />
      </div>
      <div>
        <p className="text-base font-semibold leading-tight">Fifth planner</p>
        <p className="text-xs text-muted">life overview notebook</p>
      </div>
    </div>
  );
}

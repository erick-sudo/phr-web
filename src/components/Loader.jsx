export function Loader({ className }) {
  return (
    <div
      style={{ zIndex: 5 }}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      <div className="h-20 w-20 border-x-4 border-emerald-500 rounded-full animate-spin bg-white"></div>
    </div>
  );
}

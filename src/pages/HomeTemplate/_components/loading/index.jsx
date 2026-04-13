export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-zinc-950">
      
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-zinc-800 rounded-full"></div>
        
        <div className="absolute inset-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-zinc-400 text-sm tracking-widest uppercase animate-pulse">
        Loading cinema experience...
      </p>

      {/* Dots */}
      <div className="mt-3 flex gap-1">
        <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></span>
      </div>

    </div>
  );
}
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#397eff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Loading Psychologist Evaluation...</p>
      </div>
    </div>
  )
}

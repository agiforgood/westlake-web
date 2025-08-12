export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="ml-64 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-800 rounded w-48 mb-2"></div>
          <div className="h-4 bg-slate-800 rounded w-64 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="h-4 bg-slate-800 rounded w-24 mb-2"></div>
                <div className="h-8 bg-slate-800 rounded w-16"></div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <div className="h-6 bg-slate-800 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

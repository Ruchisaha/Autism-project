export function Header() {
  return (
    <div className="text-center mb-10">
      <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
        <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4 leading-tight">
        🧠 NeuroTrack
      </h1>
      <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
      <p className="text-gray-700 text-xl font-medium">Provide your child's details to receive AI-based  Autism therapy suggestions</p>
    </div>
  )
}
import { useRef } from 'react'

export function ResultsDisplay({ result, handleDownloadPDF }) {
  const resultRef = useRef(null)

  if (!result) return null

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      {/* Focus Areas */}
      <div id="analysis-result" ref={resultRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Focus Areas
        </h3>
        <div className="flex flex-wrap gap-3">
          {result.focusAreas && result.focusAreas.map((f, i) => (
            <span 
              key={i} 
              className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-semibold text-sm border border-blue-300 transform transition-transform duration-200 hover:scale-105"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Therapy Goals */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Therapy Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.therapyGoals && result.therapyGoals.map((g, index) => (
            <div 
              key={g.id} 
              className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center mb-3">
                <span className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full font-bold text-sm">
                  {index + 1}
                </span>
                <h4 className="ml-3 font-semibold text-green-800">Goal {index + 1}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
          </svg>
          Recommended Activities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.activities && result.activities.map((a, index) => (
            <div 
              key={a.id} 
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full font-bold text-sm">
                  {index + 1}
                </span>
                <h4 className="ml-3 font-semibold text-purple-800">Activity {index + 1}</h4>
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-3">{a.text}</p>
              {a.steps && (
                <div>
                  <h5 className="font-semibold text-purple-700 mb-2">Steps:</h5>
                  <ol className="space-y-1">
                    {a.steps.map((s, i) => (
                      <li key={i} className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 bg-purple-200 text-purple-700 rounded-full font-semibold text-xs mr-3 mt-0.5 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PDF Download Button */}
      <div className="mt-10 text-center">
        <button 
          onClick={handleDownloadPDF} 
          className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 hover:from-green-600 hover:via-emerald-700 hover:to-teal-800 text-white font-bold rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-115 hover:-translate-y-2 active:scale-95 active:translate-y-0 border-0 text-xl"
        >
          <svg className="w-7 h-7 mr-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          📄 Download PDF Report
        </button>
      </div>
    </div>
  )
}
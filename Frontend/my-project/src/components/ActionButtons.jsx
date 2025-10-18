export function ActionButtons({ loading, isFormComplete, setForm, setResult, setMessage }) {
  const handleReset = () => {
    setForm({
      name: '',
      age: '',
      parentName: '',
      phoneNumber: '',
      eyeContact: '',
      speechLevel: '',
      socialResponse: '',
      sensoryReactions: '',
    })
    setResult(null)
    setMessage(null)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <button
        type="submit"
        disabled={loading || !isFormComplete()}
        className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-700 hover:from-blue-700 hover:via-purple-700 hover:to-violet-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 focus:ring-4 focus:ring-purple-500/50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          'Get AI Assessment'
        )}
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:ring-4 focus:ring-red-500/50"
      >
        Reset Form
      </button>
    </div>
  )
}
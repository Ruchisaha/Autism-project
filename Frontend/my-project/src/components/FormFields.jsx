export function FormFields({ form, updateField }) {
  return (
    <>
      {/* Child's Name */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-violet-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
            Child's Name
          </span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={e => {
            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
            updateField('name', value)
          }}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 hover:border-violet-300 placeholder-gray-500 bg-gray-50/50 focus:bg-white"
          placeholder="Enter child's full name"
        />
      </div>

      {/* Child's Age */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-indigo-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
            Child's Age
          </span>
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={form.age}
          onChange={e => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            updateField('age', value)
          }}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 placeholder-gray-500 bg-gray-50/50 focus:bg-white"
          placeholder="Enter child's age"
        />
      </div>

      {/* Parent Name */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-emerald-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            Parent/Guardian Name
          </span>
        </label>
        <input
          type="text"
          value={form.parentName}
          onChange={e => {
            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
            updateField('parentName', value)
          }}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 placeholder-gray-500 bg-gray-50/50 focus:bg-white"
          placeholder="Enter parent or guardian name"
        />
      </div>

      {/* Phone Number */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-green-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Phone Number
          </span>
        </label>
        <input
          type="tel"
          value={form.phoneNumber}
          onChange={e => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            if (value.length <= 10) {
              updateField('phoneNumber', value)
            }
          }}
          maxLength="10"
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-green-300 placeholder-gray-500 bg-gray-50/50 focus:bg-white"
          placeholder="Enter 10 digit phone number"
        />
      </div>

      {/* Gender */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Gender
          </span>
        </label>
        <select
          value={form.gender}
          onChange={e => updateField('gender', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Eye Contact */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-purple-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            Eye Contact
          </span>
        </label>
        <select
          value={form.eyeContact}
          onChange={e => updateField('eyeContact', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select eye contact level</option>
          <option value="frequent">Good eye contact</option>
          <option value="occasional">Some eye contact</option>
          <option value="minimal">Little eye contact</option>
          <option value="avoids">No eye contact</option>
        </select>
      </div>

      {/* Communication */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-cyan-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
            Communication
          </span>
        </label>
        <select
          value={form.communication}
          onChange={e => updateField('communication', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select communication level</option>
          <option value="verbal">Speaks well</option>
          <option value="some-verbal">Speaks sometimes</option>
          <option value="non-verbal">Doesn't speak much</option>
          <option value="gestures">Uses gestures</option>
        </select>
      </div>

      {/* Speech Patterns */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            Speech Patterns
          </span>
        </label>
        <select
          value={form.speechPatterns}
          onChange={e => updateField('speechPatterns', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select speech level</option>
          <option value="age-appropriate">Normal speech</option>
          <option value="delayed">Late speech</option>
          <option value="repetitive">Repeats words</option>
          <option value="non-verbal">Very little speech</option>
        </select>
      </div>

      {/* Social Response */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-teal-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
            Social Response
          </span>
        </label>
        <select
          value={form.socialResponse}
          onChange={e => updateField('socialResponse', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select social response level</option>
          <option value="responsive">Good social skills</option>
          <option value="somewhat-responsive">Some social skills</option>
          <option value="limited-response">Limited social skills</option>
          <option value="withdrawn">Avoids social interaction</option>
        </select>
      </div>

      {/* Sensory Reactions */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-rose-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
            Sensory Reactions
          </span>
        </label>
        <select
          value={form.sensoryReactions}
          onChange={e => updateField('sensoryReactions', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select sensory reaction level</option>
          <option value="typical">Normal reactions</option>
          <option value="some-sensitivity">Some sensitivity</option>
          <option value="high-sensitivity">Very sensitive</option>
          <option value="seeks-stimulation">Seeks stimulation</option>
        </select>
      </div>

      {/* Photo Upload for Emotion Detection */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-pink-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
            Child's Photo (for Emotion Analysis)
          </span>
        </label>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0]
              if (file) {
                const previewUrl = URL.createObjectURL(file)
                updateField('photo', file)
                updateField('photoPreview', previewUrl)
              }
            }}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 hover:border-pink-300 bg-gray-50/50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
          
          {form.photoPreview && (
            <div className="relative flex justify-center">
              <img 
                src={form.photoPreview} 
                alt="Child's photo preview"
                className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-200 shadow-sm"
              />
              <button
                type="button"
                onClick={() => {
                  updateField('photo', null)
                  updateField('photoPreview', null)
                  updateField('detectedEmotions', null)
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Emotion Display */}
      {form.detectedEmotions && (
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-6 rounded-2xl border border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3 animate-pulse"></div>
            <h4 className="text-xl font-bold text-gray-800 animate-bounce">🎭 Facial Expression Analysis</h4>
          </div>
          
          {/* Top 3 emotions with beautiful cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(form.detectedEmotions)
              .sort(([,a], [,b]) => b - a) // Sort by confidence
              .slice(0, 3) // Top 3 emotions
              .map(([emotion, confidence], index) => {
                const percentage = Math.round(confidence * 100)
                const emotionIcons = {
                  happiness: '😊',
                  sadness: '😢', 
                  anger: '😠',
                  fear: '😨',
                  surprise: '😮',
                  neutral: '😐',
                  disgust: '🤢',
                  contempt: '😤'
                }
                
                const emotionNames = {
                  happiness: 'Happy',
                  sadness: 'Sad',
                  anger: 'Angry', 
                  fear: 'Fearful',
                  surprise: 'Surprised',
                  neutral: 'Neutral',
                  disgust: 'Disgusted',
                  contempt: 'Contempt'
                }
                
                const gradients = [
                  'from-green-400 to-blue-500',
                  'from-purple-400 to-pink-500', 
                  'from-yellow-400 to-orange-500'
                ]
                
                return (
                  <div key={emotion} className={`bg-white p-4 rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:rotate-2 cursor-pointer group ${index === 0 ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 animate-pulse hover:animate-bounce' : 'border-gray-200 hover:border-purple-300'}`}>
                    <div className="text-center">
                      <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{emotionIcons[emotion] || '😐'}</div>
                      <h5 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-purple-600 transition-colors duration-300">
                        {emotionNames[emotion] || emotion}
                      </h5>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent group-hover:animate-pulse`}>
                        {percentage}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 group-hover:h-3 transition-all duration-300">
                        <div 
                          className={`bg-gradient-to-r ${gradients[index]} h-2 group-hover:h-3 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {index === 0 && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 group-hover:animate-bounce transition-all duration-300">
                            🏆 Dominant
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
          
          {/* All emotions compact view */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <h6 className="text-sm font-semibold text-gray-600 mb-3 flex items-center hover:text-blue-600 transition-colors duration-300">
              📊 Complete Analysis
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full animate-pulse hover:bg-blue-200 transition-all duration-300">
                {Object.keys(form.detectedEmotions).length} emotions detected
              </span>
            </h6>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(form.detectedEmotions)
                .sort(([,a], [,b]) => b - a)
                .map(([emotion, confidence]) => {
                  const percentage = Math.round(confidence * 100)
                  const emotionNames = {
                    happiness: 'Happy',
                    sadness: 'Sad',
                    anger: 'Angry', 
                    fear: 'Fearful',
                    surprise: 'Surprised',
                    neutral: 'Neutral',
                    disgust: 'Disgusted',
                    contempt: 'Contempt'
                  }
                  
                  return (
                    <div key={emotion} className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group">
                      <div className="text-xs font-medium text-gray-600 mb-1 group-hover:text-purple-600 group-hover:font-bold transition-all duration-300">
                        {emotionNames[emotion] || emotion}
                      </div>
                      <div className="text-sm font-bold text-blue-600 group-hover:text-purple-600 group-hover:animate-bounce transition-all duration-300">
                        {percentage}%
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              ✨ This emotional analysis helps provide more personalized therapy recommendations
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-pink-50 rounded-2xl border border-pink-200">
        <p className="text-xs text-gray-500 text-center">
          Upload a clear photo of the child's face for emotion analysis. This helps provide better assessment results.
        </p>
      </div>
    </>
  )
}
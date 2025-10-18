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
          placeholder="Enter parent/guardian name"
        />
      </div>

      {/* Phone Number */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-purple-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            Phone Number
          </span>
        </label>
        <input
          type="tel"
          maxLength="10"
          value={form.phoneNumber}
          onChange={e => {
            const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
            updateField('phoneNumber', value)
          }}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 placeholder-gray-500 bg-gray-50/50 focus:bg-white"
          placeholder="Enter phone number"
        />
      </div>

      {/* Eye Contact */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-rose-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
            Eye Contact
          </span>
        </label>
        <select
          value={form.eyeContact}
          onChange={e => updateField('eyeContact', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select eye contact level</option>
          <option value="normal">Makes appropriate eye contact</option>
          <option value="limited">Limited eye contact</option>
          <option value="avoids">Avoids eye contact</option>
        </select>
      </div>

      {/* Speech Level */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-blue-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Speech Level
          </span>
        </label>
        <select
          value={form.speechLevel}
          onChange={e => updateField('speechLevel', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select speech level</option>
          <option value="age-appropriate">Age-appropriate speech</option>
          <option value="delayed">Delayed speech development</option>
          <option value="repetitive">Repetitive or echolalic speech</option>
          <option value="non-verbal">Non-verbal or minimal speech</option>
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
          <option value="responsive">Responds appropriately to social cues</option>
          <option value="somewhat-responsive">Somewhat responsive to social interaction</option>
          <option value="limited-response">Limited response to social interaction</option>
          <option value="withdrawn">Withdrawn or avoids social interaction</option>
        </select>
      </div>

      {/* Sensory Reactions */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-orange-600 transition-colors duration-300">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            Sensory Reactions
          </span>
        </label>
        <select
          value={form.sensoryReactions}
          onChange={e => updateField('sensoryReactions', e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 bg-gray-50/50 focus:bg-white cursor-pointer"
        >
          <option value="">Select sensory reaction pattern</option>
          <option value="typical">Typical sensory responses</option>
          <option value="over-sensitive">Over-sensitive to sounds, textures, or lights</option>
          <option value="under-sensitive">Under-sensitive or seeks intense sensory input</option>
          <option value="mixed">Mixed sensory reactions</option>
        </select>
      </div>
    </>
  )
}
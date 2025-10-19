import { useState, useRef } from 'react'
import './App.css'
import { generatePDF } from './pdfUtils.js'
import { Header } from './components/Header.jsx'
import { FormFields } from './components/FormFields.jsx'
import { ActionButtons } from './components/ActionButtons.jsx'
import { MessageDisplay } from './components/MessageDisplay.jsx'
import { ResultsDisplay } from './components/ResultsDisplay.jsx'

function App() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    parentName: '',
    phoneNumber: '',
    eyeContact: '',
    speechLevel: '',
    socialResponse: '',
    sensoryReactions: '',
  })

  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [provider, setProvider] = useState(null)

  const resultRef = useRef(null)
  const containerRef = useRef(null)

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const isFormComplete = () => {
    return form.name && form.age && form.parentName && form.phoneNumber && form.phoneNumber.length === 10 && form.eyeContact && form.speechLevel && form.socialResponse && form.sensoryReactions
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    setResult(null)

    // Basic validation
    if (!form.age) {
      setMessage({ type: 'error', text: "Please enter the child's age" })
      return
    }

    setLoading(true)
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!resp.ok) {
        const text = await resp.text()
        // show server response body (helps debug 500s)
        throw new Error(text || `Server responded ${resp.status}`)
      }

      const prov = resp.headers.get('X-AI-Provider') || null
      setProvider(prov)

      const data = await resp.json()
      setResult(data)

      // Save form data to Firebase after successful AI analysis
      try {
        console.log('Attempting to save to Firebase...')
        const recordResp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            age: form.age,
            eyeContact: form.eyeContact,
            speechLevel: form.speechLevel,
            socialResponse: form.socialResponse,
            sensoryReactions: form.sensoryReactions,
            timestamp: new Date().toISOString(),
            aiResponse: data
          }),
        })
        
        console.log('Firebase save response status:', recordResp.status)
        
        if (recordResp.ok) {
          const saveResult = await recordResp.json()
          console.log('Data saved to Firebase:', saveResult)
          // Success - no message to user, just save silently
        } else {
          const errorText = await recordResp.text()
          console.error('Firebase save failed:', errorText)
          // Fail silently - don't show error to user
        }
      } catch (saveErr) {
        console.error('Failed to save to Firebase:', saveErr)
        // Don't show error to user if main analysis worked
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || String(err) })
    } finally {
      setLoading(false)
    }
  }

  async function handleDownloadPDF() {
    generatePDF(form, result, provider)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div id="card-container" ref={containerRef} className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        
        <Header />

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormFields form={form} updateField={updateField} />
          <ActionButtons 
            loading={loading}
            isFormComplete={isFormComplete}
            setForm={setForm}
            setResult={setResult}
            setMessage={setMessage}
          />
        </form>

        <MessageDisplay message={message} loading={loading} />
        <ResultsDisplay result={result} handleDownloadPDF={handleDownloadPDF} />

      </div>
    </div>
  )
}

export default App

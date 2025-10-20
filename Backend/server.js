const express = require('express')
const cors = require('cors')
const axios = require('axios')
// load .env from the Backend folder explicitly so dotenv works regardless of cwd
require('dotenv').config({ path: require('path').join(__dirname, '.env') })

// Helper to detect which AI provider will be used (for diagnostics only)
function detectProvider() {
	const geminiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()
	const openaiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim()
	if (geminiKey) return 'gemini'
	if (openaiKey) return 'openai'
	return 'none'
}

console.log('Backend starting, AI provider:', detectProvider())

const app = express()

// Simple and reliable CORS configuration
app.use(cors({
  origin: true, // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
}))

// Additional CORS middleware to ensure headers are set
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
  res.header('Access-Control-Allow-Credentials', 'true')
  
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request from:', origin)
    return res.sendStatus(200)
  }
  
  next()
})

app.use(express.json())

// Root route
app.get('/', (req, res) => {
	res.json({ 
		message: 'Autism Assessment Backend API',
		version: '1.0.0',
		endpoints: {
			health: 'GET /health',
			provider: 'GET /provider', 
			analyze: 'POST /analyze-ai',
			records: 'GET/POST /records'
		},
		status: 'running'
	})
})

app.get('/health', (req, res) => {
	res.json({ status: 'ok' })
})

// Diagnostic endpoint (safe): returns which AI provider the process will use
app.get('/provider', (req, res) => {
  res.json({ provider: detectProvider() })
})

// Development helper: reload .env from disk and report the detected provider.
// WARNING: intended for local dev only. Does not return secret values.
app.post('/reload-env', (req, res) => {
	try {
		// re-load .env explicitly from Backend folder
		const dotenv = require('dotenv')
		const path = require('path')
		dotenv.config({ path: path.join(__dirname, '.env'), override: true })
		const prov = detectProvider()
		console.log('reload-env called, provider now:', prov)
		return res.json({ reloaded: true, provider: prov })
	} catch (err) {
		console.error('reload-env error', err && err.message)
		return res.status(500).json({ reloaded: false, error: err && err.message })
	}
})

app.post('/analyze', (req, res) => {
	const { age, eyeContact, speechLevel, socialResponse, sensoryReactions } = req.body || {}

	// Simple placeholder analysis (do not use as diagnosis)
	const issues = []
	if (eyeContact === 'avoids' || eyeContact === 'reduced') issues.push('low eye contact')
	if (speechLevel === 'nonverbal' || speechLevel === 'limited') issues.push('speech concerns')
	if (socialResponse === 'delayed' || socialResponse === 'limited') issues.push('social response concerns')
	if (sensoryReactions === 'hypersensitive' || sensoryReactions === 'hyposensitive') issues.push('sensory differences')

	const summary = issues.length ? `Observations: ${issues.join(', ')}.` : 'No obvious concerns detected.'
	const recommendation = 'This is a simple automated check. Consult a professional for evaluation.'

	res.json({ summary, recommendation, received: { age, eyeContact, speechLevel, socialResponse, sensoryReactions } })
})

// POST /analyze-ai
// Accepts the same payload as /analyze but sends it to an AI model
// Returns structured JSON: { focusAreas:[], therapyGoals:[...], activities:[...] }
app.post('/analyze-ai', async (req, res) => {
	const { name, age, parentName, phoneNumber, eyeContact, speechLevel, socialResponse, sensoryReactions } = req.body || {}

	// Log which provider will be used for this request (no secrets)
	const requestProvider = detectProvider()
	console.log('/analyze-ai incoming — provider:', requestProvider)
	console.log('Request data:', { name, age, parentName, phoneNumber, eyeContact, speechLevel, socialResponse, sensoryReactions })

	// basic validation
	if (age === undefined || age === null) {
		return res.status(400).json({ error: 'Missing required field: age' })
	}

		const openaiModel = process.env.OPENAI_MODEL || 'gpt-3.5-turbo'
		const openaiKey = process.env.OPENAI_API_KEY
		const geminiKey = process.env.GEMINI_API_KEY
		const geminiModel = process.env.GEMINI_MODEL || 'models/text-bison'

		// Build a strict prompt asking for ONLY JSON
		const system = `You are a concise pediatric therapy assistant. Respond ONLY with valid JSON matching the schema described. Do not add any explanatory text.`

		const schemaInstruction = `Return a JSON object with the following fields exactly:\n- focusAreas: array of short strings (e.g. ["Social interaction", "Speech"])\n- therapyGoals: array of 3 objects {id: string, text: string} (three short therapy goals)\n- activities: array of 2 objects {id: string, text: string, steps?: string[]} (two simple activities)\nDo not include any other fields.`

		const user = `Child data:\nage: ${age}\neyeContact: ${eyeContact}\nspeechLevel: ${speechLevel}\nsocialResponse: ${socialResponse}\nsensoryReactions: ${sensoryReactions}\n\n${schemaInstruction}\nPrompt: Based on this child's responses, give 3 short therapy goals and 2 activities that can help improvement.`

		// Check if any API key is available
		if (!geminiKey && !openaiKey) {
			console.error('No AI API key configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in .env file.')
			return res.status(500).json({ 
				error: 'AI service not configured', 
				message: 'No API key found. Please configure GEMINI_API_KEY or OPENAI_API_KEY.' 
			})
		}

		try {
			// Prefer Gemini (Google) if GEMINI_API_KEY is present
			if (geminiKey) {
				// Gemini v1 REST API endpoint
				const url = `https://generativelanguage.googleapis.com/v1/models/${geminiModel}:generateContent?key=${geminiKey}`
				const body = {
					contents: [{
						parts: [{
							text: `${system}\n\n${user}`
						}]
					}],
					generationConfig: {
						temperature: 0.2,
						maxOutputTokens: 2000
					}
				}

				const resp = await axios.post(url, body, { timeout: 30000 })
				// Extract content from Gemini v1 response format
				let content = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text

				if (!content) return res.status(502).json({ error: 'Empty response from Gemini provider', raw: resp.data })

				// Clean up JSON response - remove markdown code blocks if present
				content = content.replace(/```json\n?/g, '').replace(/\n?```/g, '').trim()
				
				// Also handle cases where response doesn't have code blocks but has extra formatting
				if (content.startsWith('```')) {
					content = content.replace(/^```[a-z]*\n?/g, '').replace(/\n?```$/g, '').trim()
				}

				let parsed
				try { 
					parsed = JSON.parse(content) 
				} catch (e) { 
					console.log('JSON parse error:', e.message)
					console.log('Raw content:', content)
					return res.status(502).json({ error: 'Invalid JSON from Gemini', raw: content }) 
				}

				if (!Array.isArray(parsed.focusAreas) || !Array.isArray(parsed.therapyGoals) || !Array.isArray(parsed.activities)) {
					return res.status(502).json({ error: 'Gemini returned JSON but missing required arrays', parsed })
				}

				// Save complete analysis to Firebase automatically
				try {
					const record = {
						id: `analysis_${Date.now()}`,
						timestamp: new Date().toISOString(),
						childData: {
							name: name || 'Unknown',
							age,
							parentName: parentName || '',
							phoneNumber: phoneNumber || '',
							eyeContact,
							speechLevel,
							socialResponse,
							sensoryReactions
						},
						aiResponse: parsed,
						aiProvider: 'gemini'
					}

					console.log('Attempting to save analysis to Firebase...')
					console.log('Record ID:', record.id)
					console.log('Firestore available:', !!firestore)

					if (firestore) {
						await firestore.collection('analyses').doc(record.id).set(record)
						console.log('✅ Analysis successfully saved to Firebase:', record.id)
					} else {
						console.log('❌ Firestore not available - skipping save')
					}
				} catch (saveErr) {
					console.error('❌ Failed to save analysis to Firebase:', saveErr.message)
					console.error('Full error:', saveErr)
					// Continue even if save fails - don't break the analysis response
				}

				res.setHeader('X-AI-Provider', 'gemini')
				return res.json(parsed)
			}

			// Else if OpenAI key is present, use OpenAI
			if (openaiKey) {
				const resp = await axios.post(
					'https://api.openai.com/v1/chat/completions',
					{
						model: openaiModel,
						messages: [
							{ role: 'system', content: system },
							{ role: 'user', content: user }
						],
						temperature: 0.2,
						max_tokens: 500
					},
					{
						headers: {
							Authorization: `Bearer ${openaiKey}`,
							'Content-Type': 'application/json'
						},
						timeout: 30000
					}
				)

				const content = resp.data && resp.data.choices && resp.data.choices[0] && resp.data.choices[0].message && resp.data.choices[0].message.content
				if (!content) return res.status(502).json({ error: 'Empty response from OpenAI provider', raw: resp.data })

				let parsed
				try { parsed = JSON.parse(content) } catch (e) { return res.status(502).json({ error: 'Invalid JSON from OpenAI', raw: content }) }

				if (!Array.isArray(parsed.focusAreas) || !Array.isArray(parsed.therapyGoals) || !Array.isArray(parsed.activities)) {
					return res.status(502).json({ error: 'OpenAI returned JSON but missing required arrays', parsed })
				}

				// Save complete analysis to Firebase automatically
				try {
					const record = {
						id: `analysis_${Date.now()}`,
						timestamp: new Date().toISOString(),
						childData: {
							name: name || 'Unknown',
							age,
							parentName: parentName || '',
							phoneNumber: phoneNumber || '',
							eyeContact,
							speechLevel,
							socialResponse,
							sensoryReactions
						},
						aiResponse: parsed,
						aiProvider: 'openai'
					}

					console.log('Attempting to save OpenAI analysis to Firebase...')
					console.log('Record ID:', record.id)

					if (firestore) {
						await firestore.collection('analyses').doc(record.id).set(record)
						console.log('✅ OpenAI Analysis successfully saved to Firebase:', record.id)
					} else {
						console.log('❌ Firestore not available - skipping OpenAI save')
					}
				} catch (saveErr) {
					console.error('Failed to save analysis to Firebase:', saveErr)
					// Continue even if save fails - don't break the analysis response
				}

				res.setHeader('X-AI-Provider', 'openai')
				return res.json(parsed)
			}
		} catch (err) {
			console.error('AI call error', err && err.message)
			const status = err.response && err.response.status ? err.response.status : 500
			const data = err.response && err.response.data ? err.response.data : { message: err.message }
			return res.status(status).json({ error: 'AI provider error', details: data })
		}
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))

// --- Simple JSON storage for records -------------------------------------------------
const fs = require('fs')
const path = require('path')
const DATA_DIR = path.join(__dirname, 'data')
const RECORDS_FILE = path.join(DATA_DIR, 'records.json')

// Try to initialize Firestore if the firebase helper exists. This is optional.
let USE_FIRESTORE = false
let firestore = null
try {
	const fb = require('./firebase')
	if (fb && fb.db) {
		firestore = fb.db
		USE_FIRESTORE = true
		console.log('Firestore initialized: records endpoints will use Firestore')
	}
} catch (e) {
	// not fatal; continue using file-based storage
	console.log('Firestore not initialized (optional). Using file storage for records.')
}

// ensure data directory and file exist
function ensureDataFile() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
	if (!fs.existsSync(RECORDS_FILE)) fs.writeFileSync(RECORDS_FILE, '[]', 'utf8')
}

ensureDataFile()

// Helper to read records
async function readRecords() {
	try {
		const raw = await fs.promises.readFile(RECORDS_FILE, 'utf8')
		return JSON.parse(raw || '[]')
	} catch (e) {
		return []
	}
}

// Helper to write records
async function writeRecords(records) {
	await fs.promises.writeFile(RECORDS_FILE, JSON.stringify(records, null, 2), 'utf8')
}

// Save a new record (basic validation)
app.post('/records', async (req, res) => {
	const payload = req.body || {}
	const { age, eyeContact, speechLevel, socialResponse, sensoryReactions } = payload

	if (age === undefined || age === null) {
		return res.status(400).json({ error: 'Missing required field: age' })
	}

	const record = {
		id: `r_${Date.now()}`,
		timestamp: new Date().toISOString(),
		data: { age, eyeContact, speechLevel, socialResponse, sensoryReactions }
	}

	try {
		if (USE_FIRESTORE && firestore) {
			// write to Firestore collection `records` using record.id as document id
			await firestore.collection('records').doc(record.id).set(record)
			return res.status(201).json({ saved: true, id: record.id, timestamp: record.timestamp, backend: 'firestore' })
		}

		ensureDataFile()
		const records = await readRecords()
		records.push(record)
		await writeRecords(records)
		return res.status(201).json({ saved: true, id: record.id, timestamp: record.timestamp, backend: 'file' })
	} catch (err) {
		console.error('Error saving record', err)
		return res.status(500).json({ error: 'Failed to save record' })
	}
})

// List saved records (read-only)
app.get('/records', async (req, res) => {
	try {
		if (USE_FIRESTORE && firestore) {
			const snapshot = await firestore.collection('records').orderBy('timestamp', 'desc').limit(1000).get()
			const out = []
			snapshot.forEach(doc => out.push(doc.data()))
			return res.json(out)
		}

		ensureDataFile()
		const records = await readRecords()
		return res.json(records)
	} catch (err) {
		console.error('Error reading records', err)
		return res.status(500).json({ error: 'Failed to read records' })
	}
})


# Backend — local setup

This folder contains the Express backend used by the frontend. Keep API keys and secrets out
of version control. Use the `.env.template` file as a guide and create a local `.env` file.

Steps to set up locally

1. Copy the template to `.env` and fill in your real keys (DO NOT commit `.env`):

   cp .env.template .env

2. Edit `.env` and paste your real keys (example keys in the template are placeholders):

   # Example (.env)
   GEMINI_API_KEY=your-real-gemini-key-if-any
   GEMINI_MODEL=models/text-bison
   OPENAI_API_KEY=your-real-openai-key-if-any
   OPENAI_MODEL=gpt-4o-mini
   PORT=4000

3. Start the backend (from this folder):

   # stop any running instance (safe even if none running)
   pkill -f "node .*server.js" || true

   # run in background
   nohup node server.js > /tmp/backend.log 2>&1 &

4. Check the health endpoint:

   curl http://localhost:4000/health

5. Test the AI route (sample payload):

   curl -s -X POST http://localhost:4000/analyze-ai -H "Content-Type: application/json" \
     -d '{"age":4,"eyeContact":"avoids","speechLevel":"limited","socialResponse":"delayed","sensoryReactions":"hypersensitive"}'

Security notes
- Never commit `.env` to git. This repo includes `.gitignore` that lists `.env` but double-check before committing.
- If you accidentally commit keys, rotate them immediately and remove them from the git history.

If you want, reply "done" after creating your local `Backend/.env` and I will restart the backend, run a sample `POST /analyze-ai`, and report the provider response (or fix any runtime errors).

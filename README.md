# Antei TakeHome Task

## Backend

### Runnning the server
- Make sure you have node v22.6.0 and typescript installed on the system
- Clone the repository
- Copy the .env.example file contents to .env file
- Add the Gemini API key
- Follow these commands
<pre>
    cd backend/
    tsc -b
    node dist/
</pre>
- The server will now start running on port 3000

### Folder structure
<pre>
src/
  ├── api/
        └── routes.ts       # API Endpoints
  ├── gemini/
        ├── geminiManager.ts    # Code for Gemini API
        └── types.ts            # Interfaces for type safety
  ├── store/
        storageManager.ts       # Code for storage handling
  └── index.ts              # Starting point of server
</pre>

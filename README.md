# Mahi Gupta — Portfolio

A full-stack MERN portfolio with project showcases.

## Project Showcase Files

Place all showcase HTML files inside `client/public/showcases/`:

| File | Project |
|------|---------|
| `aetheria-admin-showcase.html` | Aetheria Heights — Admin Portal |
| `aetheria-user-showcase.html` | Aetheria Heights — User/Guest Portal |
| `thesisease-pgdissertation-showcase.html` | ThesisEase PG Dissertation |
| `acadex-showcase.html` | Acadex Academic Platform |
| `filerecovery-showcase.html` | File Recovery System |

The `aetheria-admin-showcase.html` and `filerecovery-showcase.html` files are already included.
Copy the remaining 3 from your previously downloaded showcase files into `client/public/showcases/`.

## Setup

```bash
npm install           # root
cd client && npm install
cd ../server && npm install
```

Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev   # runs both client + server
```

## Deploy
- Frontend: Vercel / Netlify  
- Backend: Railway / Render  
- DB: MongoDB Atlas

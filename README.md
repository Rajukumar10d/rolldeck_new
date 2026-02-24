# Rolldeck Pro (MERN)

This project is a MERN-style site: **React (Vite) client** + **Express API** + **MongoDB (optional in dev)**.

The UI is inspired by the layout of [Acidtest Design](https://www.acidtestdesign.com/) but uses your own text and data.

## Run locally

### 1) Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 2) Start dev servers

Start the API:

```bash
npm run dev --prefix server
```

Start the client:

```bash
npm run dev --prefix client
```

Vite will print the URL (usually `http://localhost:5173`, but it may pick another port if busy).

## MongoDB (optional but recommended)

- If MongoDB is **not** running, the API will still work using an in-memory fallback for projects.
- If you have MongoDB running locally, set `server/.env`:

```
MONGODB_URI=mongodb://127.0.0.1:27017/rolldeckpro
```

Then seed the database:

```bash
powershell -NoProfile -Command "Invoke-RestMethod -Method Post http://localhost:5000/api/projects/seed | ConvertTo-Json"
```

## Key endpoints

- `GET /api/health`
- `GET /api/projects`
- `POST /api/projects/seed`


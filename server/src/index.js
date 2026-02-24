import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { projectsRouter } from "./routes/projects.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (origin === CLIENT_ORIGIN) return cb(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);

async function start() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
      console.log("MongoDB connected");
    } catch (err) {
      console.warn("MongoDB not connected (running with in-memory fallback).");
      console.warn(err?.message || err);
    }
  } else {
    console.warn("No MONGODB_URI set (running with in-memory fallback).");
  }

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });

  // Keep process alive in some terminal environments.
  setInterval(() => {}, 1 << 30);
}

start().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


import express from "express";
import mongoose from "mongoose";
import { Project } from "../models/Project.js";

export const projectsRouter = express.Router();

const defaults = [
  {
    index: 1,
    tag: "Brand & Web",
    title: "Sidemen",
    description:
      "Ongoing creative direction and digital design for leading content creators.",
  },
  {
    index: 2,
    tag: "Product & Web",
    title: "Found AI",
    description: "AI office finder experience built around clarity, speed and focus.",
  },
  {
    index: 3,
    tag: "Web Design",
    title: "Haines",
    description: "Site design for a global rebrand in the CPG sector.",
  },
  {
    index: 4,
    tag: "Product & Growth",
    title: "WeGLOW",
    description: "Design, build and marketing for a female focused fitness app.",
  },
  {
    index: 5,
    tag: "Webflow",
    title: "Stride Social",
    description:
      "Web design for an influencer marketing agency with a bold, graphic look.",
  },
  {
    index: 6,
    tag: "Brand & Web",
    title: "Side+",
    description:
      "Streaming platform and subscription service for exclusive creator content.",
  },
  {
    index: 7,
    tag: "Talent & Web",
    title: "Upload Agency",
    description:
      "Site design and build for a UK based talent agency representing digital-first creators.",
  },
  {
    index: 8,
    tag: "Talent & Web",
    title: "OP Talent",
    description:
      "Digital presence for a talent management company focused on emerging online entertainers.",
  },
  {
    index: 9,
    tag: "Brand & Web",
    title: "Best Breakfast",
    description: "Colourful brand world and website for a playful cereal brand.",
  },
  {
    index: 10,
    tag: "Interactive",
    title: "Hit Send",
    description:
      "Animated site experience for an interactive card game built around shared moments.",
  },
  {
    index: 11,
    tag: "Product & Web",
    title: "Found",
    description: "Website design and build for a new entrant in commercial space rental.",
  },
  {
    index: 12,
    tag: "Print & Brand",
    title: "Topps",
    description:
      "Trading card series design in collaboration with Topps, celebrating online culture.",
  },
  {
    index: 13,
    tag: "Hospitality",
    title: "Sophie’s",
    description:
      "Branding and art direction for a steak restaurant chain in central London.",
  },
  {
    index: 14,
    tag: "Talent & Web",
    title: "YM&U",
    description:
      "Digital rebrand and site design for a large global talent management group.",
  },
  {
    index: 15,
    tag: "Product",
    title: "RLine",
    description:
      "App and brand for a queue management system designed around real-world flows.",
  },
];

function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

projectsRouter.get("/", async (_req, res, next) => {
  try {
    if (!isMongoConnected()) {
      res.json({ projects: defaults, source: "memory" });
      return;
    }
    const projects = await Project.find({}, { __v: 0 })
      .sort({ index: 1 })
      .lean();
    res.json({ projects, source: "mongo" });
  } catch (err) {
    next(err);
  }
});

projectsRouter.post("/seed", async (_req, res, next) => {
  try {
    if (!isMongoConnected()) {
      res.status(503).json({ error: "MongoDB not connected. Start Mongo and retry." });
      return;
    }

    const ops = defaults.map((p) => ({
      updateOne: {
        filter: { index: p.index },
        update: { $set: p },
        upsert: true,
      },
    }));

    await Project.bulkWrite(ops);
    const projects = await Project.find({}, { __v: 0 }).sort({ index: 1 }).lean();
    res.json({ seeded: true, projects, source: "mongo" });
  } catch (err) {
    next(err);
  }
});

projectsRouter.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});


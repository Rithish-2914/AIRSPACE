const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/ai/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        error: "AI service is not configured. Please set OPENAI_API_KEY environment variable in your Vercel project settings." 
      });
    }
    
    return res.status(501).json({ 
      error: "AI features require full backend implementation. Currently using simplified Vercel serverless setup." 
    });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/ai/analyze", async (req, res) => {
  try {
    return res.status(501).json({ 
      error: "AI analysis requires full backend implementation. Currently using simplified Vercel serverless setup." 
    });
  } catch (error) {
    console.error("AI analyze error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/scenes", async (req, res) => {
  try {
    return res.status(501).json({ 
      error: "Scene persistence requires database setup. For now, scenes are stored in browser local storage." 
    });
  } catch (error) {
    console.error("Save scene error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/scenes", async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error("Get scenes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/scenes/:id", async (req, res) => {
  try {
    res.status(404).json({ error: "Scene not found" });
  } catch (error) {
    console.error("Get scene error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/scenes/:id", async (req, res) => {
  try {
    res.status(404).json({ error: "Scene not found" });
  } catch (error) {
    console.error("Delete scene error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api", (req, res) => {
  res.json({ 
    message: "AIRSPACE API - Vercel Serverless Deployment",
    status: "running",
    endpoints: [
      "POST /api/ai/chat",
      "POST /api/ai/analyze", 
      "GET /api/scenes",
      "POST /api/scenes",
      "GET /api/scenes/:id",
      "DELETE /api/scenes/:id"
    ]
  });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

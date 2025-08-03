require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection function

const app = express();

// ✅ Allow requests from local dev + Vercel deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local React frontend
      "https://arvyax-wellness-git-main-soumik-dutta-choudhurys-projects.vercel.app" // Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api", authRoutes);  // Now routes will be /api/register, /api/login
app.use("/api", sessionRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ MongoDB connected`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📌 Example: POST http://localhost:${PORT}/api/register`);
});

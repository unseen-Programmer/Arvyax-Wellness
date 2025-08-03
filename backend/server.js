import cors from "cors";


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",                        // Local development
  "https://arvyax-wellness-tawny.vercel.app"      // Vercel deployed frontend
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api", authRoutes);  
app.use("/api", sessionRoutes);

// ✅ Test route
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

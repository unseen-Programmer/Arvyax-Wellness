require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ fixed path

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes"); // ✅ added

app.use("/", authRoutes);
app.use("/", sessionRoutes); // ✅ added

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ MongoDB connected`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📌 Example: POST http://localhost:${PORT}/register`);
});

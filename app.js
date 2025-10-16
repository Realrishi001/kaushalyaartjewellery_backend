import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelizeCon } from "./src/init/dbConnection.js";
import mediaRouter from "./src/routes/media.router.js";

dotenv.config();

// ✅ Database connection and sync
sequelizeCon
  .sync({ force: false })
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

const app = express();
const port = process.env.PORT || 3085;

// ✅ CORS configuration
const corsOptions = {
  origin: "*", // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files publicly
// Any uploaded image/video can be accessed like: http://localhost:3085/uploads/<filename>
app.use("/uploads", express.static("uploads"));

// ✅ Root endpoint (for API health check)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "👋 Hello, developer! You've reached the API.",
    status: "online-ish",
    warnings: ["Payment Bacha hai abhi 💸"],
    tip: "Payment pura kardo jaldi 😉",
  });
});

// ✅ Media routes
// Handles: 
//   - POST /api/media/upload  (upload or update image/video)
//   - GET  /api/media/latest  (fetch latest media)
app.use("/api", mediaRouter);


// ✅ Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌐 Access API: http://localhost:${port}/api/media/latest`);
  console.log(`🖼️ Access uploads: http://localhost:${port}/uploads/<filename>`);
});

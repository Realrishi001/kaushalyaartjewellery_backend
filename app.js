import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelizeCon } from "./src/init/dbConnection.js";
import mediaRouter from "./src/routes/media.router.js";
import newArrivalRouter from './src/routes/newArrivals.router.js'
import catalogRouter from './src/routes/catalog.router.js'
import accessoryRouter from './src/routes/accessory.router.js'
import bestSellerRouter from './src/routes/bestSeller.router.js'

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

app.use("/api", mediaRouter);
app.use("/api", newArrivalRouter);
app.use("/api", catalogRouter)
app.use('/api', accessoryRouter);
app.use("/api", bestSellerRouter);

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

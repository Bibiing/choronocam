import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import passport from "passport";

// Import route handlers
import setupAuthRoutes from "./src/routes/authGoogle.js";
import manualAuthRoutes from "./src/routes/authManual.js";
import userRoutes from "./src/routes/userRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import uploadRoutes from "./src/uploads/image.js";

// Configuration and middleware
dotenv.config();

const app = express();

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://accounts.google.com",
          "https://vercel.live",
        ],
        scriptSrcElem: [
          "'self'",
          "https://accounts.google.com",
          "https://vercel.live",
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://chronocamm.vercel.app"],
      },
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// CORS Configuration
app.use(
  cors({
    origin: "https://chronocamm.vercel.app",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
setupAuthRoutes(app);
app.use("/auth", manualAuthRoutes);
app.use("/api", userRoutes);
app.use("/upload", uploadRoutes);
app.use("/images", imageRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? {} : err.message,
  });
});

// Server Startup
const PORT = process.env.PORT || 8080;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

// Graceful Shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

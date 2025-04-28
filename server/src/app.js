import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";

// import { ApiError } from "./utils/ApiError.js";
// import { ApiResponse } from "./utils/ApiResponse.js";
import "./config/github.config.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Test route
import getRepoInfo from "./controllers/repoInfo.controller.js";

app.get("/test", (req, res) => {
  // return res.status(200).json(new ApiResponse(200, "Welcome to the API"));
  res.send(
    "<h1>Welcome to the API</h1><br><a href='/api/v1/auth/github'>Login with Github</a>"
  );
});

app.post("/api/v1/analyze", getRepoInfo);

// Import routes
import authRoutes from "./routes/auth.route.js";
import matchRoutes from "./routes/match.route.js";
import userRoutes from "./routes/user.route.js";

import analyticsRoutes from "./routes/analytics.route.js";


// Declare routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/match", matchRoutes);
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/repo", repoRoutes)
app.use("/api/v1/analytics", analyticsRoutes);


export { app };

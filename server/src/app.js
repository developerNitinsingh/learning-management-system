import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CORS],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("ping-pong");
});

app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);

export default app;

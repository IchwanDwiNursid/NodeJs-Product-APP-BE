import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { logger } from "./application/logging.js";
import { userRouter } from "./route/userRouter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { authRouter } from "./route/authRoute.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { productRouter } from "./route/productRouter.js";

dotenv.config();

export const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    Credential: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);
app.use(errorMiddleware);
app.listen(process.env.APP_PORT, () => {
  logger.info("Server Listen On Port 5000");
});

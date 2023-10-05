import express from "express";
import "express-async-errors";
import { currentUser, errorHandler } from "@emilevi4-co/common";
import { NotFoundError } from "@emilevi4-co/common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

//here routes
app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

import express from "express";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "@emilevi4-co/common";
import { NotFoundError } from "@emilevi4-co/common";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

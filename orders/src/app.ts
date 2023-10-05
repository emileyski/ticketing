import express from "express";
import "express-async-errors";
import { currentUser, errorHandler } from "@emilevi4-co/common";
import { NotFoundError } from "@emilevi4-co/common";
import cookieSession from "cookie-session";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";
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

app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

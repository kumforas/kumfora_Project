import express from "express";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;

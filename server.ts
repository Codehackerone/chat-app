import express from "express";
import { config } from "dotenv";

const app = express();

config();

const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Chat-app running on port ${port}.`);
});

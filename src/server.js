import express from "express";
import morgan from "morgan";
import { WebhookClient } from "dialogflow-fulfillment";
import { gameStart, getNumber } from "./dialogflow/intents";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post("/webhook", (req, res) => {
  const _agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("game_start", gameStart);
  intentMap.set("game_start - custom", getNumber);
  intentMap.set("game_start - custom - custom-2", gameStart); // restart game

  _agent.handleRequest(intentMap);
});

export default app;

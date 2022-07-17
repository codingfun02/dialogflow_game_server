"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dialogflowFulfillment = require("dialogflow-fulfillment");

var _intents = require("./dialogflow/intents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.post("/webhook", function (req, res) {
  var _agent = new _dialogflowFulfillment.WebhookClient({
    request: req,
    response: res
  });

  var intentMap = new Map();
  intentMap.set("game_start", _intents.gameStart);
  intentMap.set("game_start - custom", _intents.getNumber);
  intentMap.set("game_start - custom - custom-2", _intents.gameStart); // restart game

  _agent.handleRequest(intentMap);
});
var _default = app;
exports["default"] = _default;
"use strict";

require("./env");

require("./db");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3000;

var handleServerListening = function handleServerListening() {
  console.log("\u2705 Server Listening at port ".concat(PORT));
};

_server["default"].listen(PORT, handleServerListening);
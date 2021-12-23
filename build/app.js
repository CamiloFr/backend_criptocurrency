"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// port
const port = 1000; // server online

const server = _.default.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});

var _default = server;
exports.default = _default;
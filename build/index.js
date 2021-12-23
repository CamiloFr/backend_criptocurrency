"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _criptouser = _interopRequireDefault(require("./routes/criptouser.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _authentication = _interopRequireDefault(require("./routes/authentication.routes"));

var path = _interopRequireWildcard(require("path"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import routes
// path
// swagger
// cors
// express server
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _express.json)()); // swagger

const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: "Crypto API",
      description: "Informacion de Crypto API",
      contact: {
        name: "Camilo Franco"
      }
    }
  },
  apis: [`${path.join(__dirname, "./routes/*.routes.js")}`]
};
const swaggerDocs = (0, _swaggerJsdoc.default)(swaggerOption);
app.use("/docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocs)); // app funcionando

app.get("/", (req, res) => {
  res.send({
    message: "Hello World"
  });
}); // routes

app.use("/api/cryptouser", _criptouser.default);
app.use("/api/user", _users.default);
app.use("/api/autenticacion", _authentication.default);
var _default = app;
exports.default = _default;
"use strict";

var _index = _interopRequireDefault(require("./../index"));

var _app = _interopRequireDefault(require("../app"));

var _supertest = _interopRequireDefault(require("supertest"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = (0, _supertest.default)(_index.default);
let usuario = {
  nombreusuario: "camilofr",
  contraseña: "viaje123",
  pais: "colombia"
};
let token = "";
describe("All unit testing", () => {
  beforeAll(async () => {
    api.post("/api/autenticacion/").send(usuario).end((err, res) => {
      token = `Bearer ${res.body}`;
    });
  });
  test("GET /api/cryptouser/", async () => {
    api.get("/api/cryptouser/").expect(200).expect("Content-Type", "application/json");
  }); // Descomento cuando se vaya a probar con la base de datos inicializada
  // test("POST /api/user/", async () => {
  //     api.post("/api/user/").send(usuario).expect(200);
  // })

  test("POST /api/autenticacion/", async () => {
    api.post("/api/autenticacion/").send(usuario).expect(200);
  });
  test("GET /api/user/", async () => {
    await api.get("/api/user/").set({
      Authorization: token
    }).send(usuario).expect(200);
  });
  afterAll(() => {
    _app.default.close();
  });
});
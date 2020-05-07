// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../src/server/index");

describe("GET / ", () => {
  test("It should respond with an object that contains nothing at the moment", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({});
    expect(response.statusCode).toBe(200);
  });
});
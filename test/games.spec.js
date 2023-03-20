const request = require("supertest");
const app = require("../app");

describe("Users API", () => {
  test("Get /games --> array games", async () => {
    return request(app)
      .get("/games")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                genre: expect.any(String),
                detail: expect.any(String),
                image: expect.any(String),
              }),
            ]),
          })
        );
      });
  });

  test("Get /games/detail/:id --> object games", async () => {
    return request(app)
      .get(`/games/detail/1`)
      .expect(200)
      .then((res) => {
        expect.objectContaining({
          data: expect.objectContaining({
            detail: expect.any(String),
          }),
        });
      });
  });

  test("Post /games --> create new games", async () => {
    return await request(app)
      .post("/games")
      .send({
        name: "Elden Ring",
        genre: "Open-World, Souls-like",
        image: "",
        detail:
          "Explore the world of Elden Ring as a mere tarnished to become an Elden Lord",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              name: expect.any(String),
              genre: expect.any(String),
              detail: expect.any(String),
              image: expect.any(String),
            }),
          })
        );
      });
  });

  test("Put /games --> update games data", async () => {
    return await request(app)
      .put("/games")
      .send({
        id: 1,
        name: "Dark Souls 3",
        detail: "Explore the world of Dark Souls",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              name: expect.any(String),
              genre: expect.any(String),
              detail: expect.any(String),
              image: expect.any(String),
            }),
          })
        );
      });
  });
});

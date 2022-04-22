/* eslint-disable import/no-extraneous-dependencies */
const { expect, assert } = require("chai");
let should = require("chai").should();
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Choripancho",
  image:
    "https://imgs.search.brave.com/kdepWwEuURwFvduOUltZiIpOmDDsXLwG4M_wDydXU-8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzAw/MDMvMTkxNi8wMzgx/L2FydGljbGVzL0No/b3JpX1Bhbi5qcGc_/dj0xNTk2NDk0NzU0",
  summary: "Choripan hecho con pan de pancho",
  rating: 100,
  health: 100,
  instructions:
    "Compra unos choris, unos panes de pancho y el resto es historia",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: false }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", async () => {
    it("should get 200", (done) => {
      agent.get("/recipes").expect(200);
      done();
    });
    it("Should return 200 with a GET request with a name that exists in the db", (done) => {
      agent.get("/recipes?name=Choripancho").expect(200);
      done();
    });

    // it("You should return the recipe that was requested from the db.", async (done) => {
    //   let response = await agent.get("/recipes?name=Choripancho");

    //   let chori = await Recipe.findOne({
    //     where: {
    //       name: "Choripancho",
    //     },
    //   });
    //   const recip = [chori.dataValues];
    //   expect(response.body[0]?.name).to.equal(recip.name);
    //   // expect(response.body[0].id).to.equal(recip.id);
    //   // expect(response.body[0].rating).to.equal(recip.rating);
    //   // expect(response.body[0].summary).to.equal(recip.summary);
    // }).timeout(10000);
  });
});

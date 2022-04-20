const { Recipe, conn } = require("../../src/db.js");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validate", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It needs a valid name")))
          .catch(() => done());
      });
      it("should create when its a valid name", () => {
        Recipe.create({ name: "Choripan" });
      });
      it("should create the rating", () => {
        Recipe.create({ rating: 100 });
      });
      it("should create the health level", () => {
        Recipe.create({ health: 100 });
      });
      it("should create the summary", () => {
        Recipe.create({ summary: "this is a choripan" });
      });
    });
  });
});

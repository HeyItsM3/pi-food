const { Router } = require("express");
const { Diet } = require("../db");
const { dietList } = require("../constants/diets");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    dietList?.map((el) => {
      Diet.findOrCreate({
        // create
        where: { name: el.name },
      });
    });
    const allTypes = await Diet.findAll(); // search for
    res.status(200).send(allTypes); // send all
  } catch (err) {
    next(err);
  }
});

module.exports = router;

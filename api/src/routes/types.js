const { Router } = require("express");
const { Diet } = require("../db");
const { dietList } = require("../constants/diets");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    dietList?.map((el) => {
      Diet.findOrCreate({
        where: { name: el.name },
      });
    });
    const allTypes = await Diet.findAll();
    res.status(200).send(allTypes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const routerRecipes = require("./recipes");
const routerTypes = require("./types");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", routerRecipes);
router.use("/types", routerTypes);

module.exports = router;

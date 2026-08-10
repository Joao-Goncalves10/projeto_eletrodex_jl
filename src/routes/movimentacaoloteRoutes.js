const express = require("express");
const router = express.Router();
const MovimentacaoLoteController = require("../controllers/movimentacaoLoteController");

router.post("/", MovimentacaoLoteController.create);
router.get("/", MovimentacaoLoteController.getAll);
router.get("/:id", MovimentacaoLoteController.getById);
router.patch("/:id", MovimentacaoLoteController.update);
router.delete("/:id", MovimentacaoLoteController.delete);

module.exports = router;
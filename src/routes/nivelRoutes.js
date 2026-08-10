const express = require("express");
const router = express.Router();
const NivelController = require("../controllers/nivelController");

router.get("/", NivelController.listar);
router.get("/:id", NivelController.buscarPorId);
router.post("/", NivelController.cadastrar);
router.put("/:id", NivelController.atualizar);
router.delete("/:id", NivelController.deletar);

module.exports = router;
const express = require("express");
const router = express.Router();
const produtoRoutes = require("./produtoRoutes");
const funcionarioRoutes = require("./funcionarioRoutes");
const loteRoutes = require("./loteRoutes");

// Rota de checagem do status da API Eletrodex
router.get("/", (req, res) => {
  res.json({
    mensagem: "API ELETRODEX - Controle de Estoque",
    versao: "1.0.0",
  });
});

router.use("/produtos", produtoRoutes);
router.use("/funcionarios", funcionarioRoutes);
router.use("/lotes", loteRoutes);

module.exports = router;
const express = require("express");
const router = express.Router();
const produtoRoutes = require("./produtoRoutes");

// Rota de checagem do status da API Eletrodex
router.get("/", (req, res) => {
  res.json({
    mensagem: "API ELETRODEX - Controle de Estoque",
    versao: "1.0.0",
  });
});


router.use("/produtos", produtoRoutes);


module.exports = router;
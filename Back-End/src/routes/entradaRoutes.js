const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

router.get('/', entradaController.listar);
router.get('/:id', entradaController.buscarPorId);
router.post('/', entradaController.criar);
router.put('/:id', entradaController.atualizar);
router.delete('/:id', entradaController.deletar);

module.exports = router;

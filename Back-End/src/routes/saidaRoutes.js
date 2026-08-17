const express = require('express');
const router = express.Router();
const saidaController = require('../controllers/saidaController');

router.get('/', saidaController.listar);
router.get('/:id', saidaController.buscarPorId);
router.post('/', saidaController.criar);
router.put('/:id', saidaController.atualizar);
router.delete('/:id', saidaController.deletar);

module.exports = router;

const LoteService = require("../services/LoteService");

class LoteController {
  async listar(req, res) {
    try {
      const lotes = await LoteService.listarLotes();
      res.status(200).json(lotes);
    } catch (error) {
      const code = error.status || 500;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const lote = await LoteService.buscarLotePorId(req.params.id);
      res.status(200).json(lote);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async cadastrar(req, res) {
    try {
      const resultado = await LoteService.cadastrarLote(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const resultado = await LoteService.atualizarLote(req.params.id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async deletar(req, res) {
    try {
      const resultado = await LoteService.deletarLote(req.params.id);
      res.status(200).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }
}

module.exports = new LoteController();

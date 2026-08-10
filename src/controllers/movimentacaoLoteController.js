const MovimentacaoLoteService = require("../services/movimentacaoLoteService");

class MovimentacaoLoteController {
  async create(req, res) {
    try {
      const movimentacao = await MovimentacaoLoteService.criarMovimentacao(req.body);
      res.status(201).json({
        mensagem: "Movimentação criada com sucesso",
        movimentacao,
      });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const movimentacoes = await MovimentacaoLoteService.listarMovimentacoes();
      res.status(200).json(movimentacoes);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao buscar movimentações",
        detalhe: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const movimentacao = await MovimentacaoLoteService.obterMovimentacaoPorId(id);
      res.status(200).json(movimentacao);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const movimentacaoAtualizada = await MovimentacaoLoteService.atualizarMovimentacao(id, req.body);
      res.status(200).json({
        mensagem: "Movimentação atualizada com sucesso",
        movimentacao: movimentacaoAtualizada,
      });
    } catch (error) {
      const code = error.message.includes("não encontrada") ? 404 : 400;
      res.status(code).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await MovimentacaoLoteService.excluirMovimentacao(id);
      res.status(200).json({ mensagem: "Movimentação excluída com sucesso" });
    } catch (error) {
      const code = error.message.includes("não encontrada") ? 404 : 400;
      res.status(code).json({ erro: error.message });
    }
  }
}

module.exports = new MovimentacaoLoteController();

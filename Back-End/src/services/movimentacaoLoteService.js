const MovimentacaoLoteRepository = require("../repositories/movimentacaoLoteRepository");

class MovimentacaoLoteService {
  async criarMovimentacao(movimentacaoData) {
    const {
      id_lote,
      localizacao,
      data_movimentacao,
      responsavel,
      estado_produto,
      ultima_revisao,
      proxima_revisao,
      setor,
    } = movimentacaoData;

    if (!id_lote) {
      throw new Error("O campo id_lote é obrigatório.");
    }

    if (!localizacao) {
      throw new Error("O campo localizacao é obrigatório.");
    }

    if (!data_movimentacao) {
      throw new Error("O campo data_movimentacao é obrigatório.");
    }

    if (!responsavel) {
      throw new Error("O campo responsavel é obrigatório.");
    }

    if (!estado_produto) {
      throw new Error("O campo estado_produto é obrigatório.");
    }

    if (!ultima_revisao) {
      throw new Error("O campo ultima_revisao é obrigatório.");
    }

    const movimentacaoId = await MovimentacaoLoteRepository.create({
      id_lote,
      localizacao,
      data_movimentacao,
      responsavel,
      estado_produto,
      ultima_revisao,
      proxima_revisao,
      setor,
    });

    return await MovimentacaoLoteRepository.findById(movimentacaoId);
  }

  async listarMovimentacoes() {
    return await MovimentacaoLoteRepository.findAll();
  }

  async obterMovimentacaoPorId(id) {
    const movimentacao = await MovimentacaoLoteRepository.findById(id);
    if (!movimentacao) {
      throw new Error("Movimentação de lote não encontrada.");
    }
    return movimentacao;
  }

  async atualizarMovimentacao(id, movimentacaoData) {
    const movimentacaoExistente = await MovimentacaoLoteRepository.findById(id);
    if (!movimentacaoExistente) {
      throw new Error("Movimentação de lote não encontrada.");
    }

    const affectedRows = await MovimentacaoLoteRepository.update(
      id,
      movimentacaoData,
    );
    if (affectedRows === 0) {
      throw new Error("Não foi possível atualizar a movimentação de lote.");
    }

    return await MovimentacaoLoteRepository.findById(id);
  }

  async excluirMovimentacao(id) {
    const movimentacaoExistente = await MovimentacaoLoteRepository.findById(id);
    if (!movimentacaoExistente) {
      throw new Error("Movimentação de lote não encontrada.");
    }

    const affectedRows = await MovimentacaoLoteRepository.delete(id);
    if (affectedRows === 0) {
      throw new Error("Falha ao excluir a movimentação de lote.");
    }
  }
}

module.exports = new MovimentacaoLoteService();

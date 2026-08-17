const LoteRepository = require("../repositories/LoteRepository");

class LoteService {
  async listarLotes() {
    const lotes = await LoteRepository.findAll();
    return {
      sucesso: true,
      dados: lotes,
      total: lotes.length,
    };
  }

  async buscarLotePorId(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const lote = await LoteRepository.findById(id);
    if (!lote) {
      throw { status: 404, mensagem: "Lote não encontrado" };
    }

    return { sucesso: true, dados: lote };
  }

  async cadastrarLote(dados) {
    const { id_produto, quantidade, localizacao, data_entrada, responsavel, nota_fiscal, valor } = dados || {};

    if (!id_produto || Number.isNaN(Number(id_produto))) {
      throw { status: 400, mensagem: "Campo id_produto inválido" };
    }

    if (!quantidade || Number.isNaN(Number(quantidade))) {
      throw { status: 400, mensagem: "Campo quantidade inválido" };
    }

    if (!localizacao || String(localizacao).trim() === "") {
      throw { status: 400, mensagem: "Localização é obrigatória" };
    }

    if (!data_entrada || String(data_entrada).trim() === "") {
      throw { status: 400, mensagem: "Data de entrada é obrigatória" };
    }

    if (!responsavel || Number.isNaN(Number(responsavel))) {
      throw { status: 400, mensagem: "Campo responsavel inválido" };
    }

    if (!nota_fiscal || Number.isNaN(Number(nota_fiscal))) {
      throw { status: 400, mensagem: "Campo nota_fiscal inválido" };
    }

    if (valor === undefined || Number.isNaN(Number(valor))) {
      throw { status: 400, mensagem: "Campo valor inválido" };
    }

    const id = await LoteRepository.create({
      id_produto: Number(id_produto),
      quantidade: Number(quantidade),
      localizacao: String(localizacao).trim(),
      data_entrada: String(data_entrada),
      responsavel: Number(responsavel),
      nota_fiscal: Number(nota_fiscal),
      valor: Number(valor),
    });

    return { sucesso: true, mensagem: "Lote cadastrado com sucesso", id };
  }

  async atualizarLote(id, dados) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existente = await LoteRepository.findById(id);
    if (!existente) {
      throw { status: 404, mensagem: "Lote não encontrado" };
    }

    const atualizacao = {};

    if (dados.id_produto !== undefined) {
      if (Number.isNaN(Number(dados.id_produto))) {
        throw { status: 400, mensagem: "Campo id_produto inválido" };
      }
      atualizacao.id_produto = Number(dados.id_produto);
    }

    if (dados.quantidade !== undefined) {
      if (Number.isNaN(Number(dados.quantidade))) {
        throw { status: 400, mensagem: "Campo quantidade inválido" };
      }
      atualizacao.quantidade = Number(dados.quantidade);
    }

    if (dados.localizacao !== undefined) {
      if (String(dados.localizacao).trim() === "") {
        throw { status: 400, mensagem: "Localização não pode ser vazia" };
      }
      atualizacao.localizacao = String(dados.localizacao).trim();
    }

    if (dados.data_entrada !== undefined) {
      atualizacao.data_entrada = String(dados.data_entrada);
    }

    if (dados.responsavel !== undefined) {
      if (Number.isNaN(Number(dados.responsavel))) {
        throw { status: 400, mensagem: "Campo responsavel inválido" };
      }
      atualizacao.responsavel = Number(dados.responsavel);
    }

    if (dados.nota_fiscal !== undefined) {
      if (Number.isNaN(Number(dados.nota_fiscal))) {
        throw { status: 400, mensagem: "Campo nota_fiscal inválido" };
      }
      atualizacao.nota_fiscal = Number(dados.nota_fiscal);
    }

    if (dados.valor !== undefined) {
      if (Number.isNaN(Number(dados.valor))) {
        throw { status: 400, mensagem: "Campo valor inválido" };
      }
      atualizacao.valor = Number(dados.valor);
    }

    if (Object.keys(atualizacao).length === 0) {
      throw { status: 400, mensagem: "Nenhum dado válido enviado para atualização" };
    }

    await LoteRepository.update(id, atualizacao);

    return { sucesso: true, mensagem: "Lote atualizado com sucesso" };
  }

  async deletarLote(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existente = await LoteRepository.findById(id);
    if (!existente) {
      throw { status: 404, mensagem: "Lote não encontrado" };
    }

    await LoteRepository.delete(id);

    return { sucesso: true, mensagem: "Lote removido com sucesso" };
  }
}

module.exports = new LoteService();

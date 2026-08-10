const NivelRepository = require("../repositories/nivelRepository");

class NivelService {
  async listarNiveis() {
    const niveis = await NivelRepository.buscarTodos();
    return {
      sucesso: true,
      dados: niveis,
      total: niveis.length,
    };
  }

  async buscarNivelPorId(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const nivel = await NivelRepository.buscarId(id);
    if (!nivel) {
      throw { status: 404, mensagem: "Nível não encontrado" };
    }

    return {
      sucesso: true,
      dados: nivel,
    };
  }

  async cadastrarNivel(dados) {
    const { descricao } = dados;

    if (!descricao || String(descricao).trim() === "") {
      throw { status: 400, mensagem: "Descrição é obrigatória" };
    }

    const novoNivel = {
      descricao: descricao.trim(),
    };

    const id = await NivelRepository.create(novoNivel);

    return {
      sucesso: true,
      mensagem: "Nível cadastrado com sucesso",
      id,
    };
  }

  async atualizarNivel(id, dados) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existe = await NivelRepository.buscarId(id);
    if (!existe) {
      throw { status: 404, mensagem: "Nível não encontrado" };
    }

    const atualizado = {};
    const { descricao } = dados;

    if (descricao !== undefined) {
      if (String(descricao).trim() === "") {
        throw { status: 400, mensagem: "Descrição não pode ser vazia" };
      }
      atualizado.descricao = descricao.trim();
    }

    if (Object.keys(atualizado).length === 0) {
      throw {
        status: 400,
        mensagem: "Nenhum dado válido enviado para atualização",
      };
    }

    await NivelRepository.atualizarNivel(id, atualizado);

    return {
      sucesso: true,
      mensagem: "Nível atualizado com sucesso",
    };
  }

  async deletarNivel(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existe = await NivelRepository.buscarId(id);
    if (!existe) {
      throw { status: 404, mensagem: "Nível não encontrado" };
    }

    await NivelRepository.deletarNivel(id);

    return {
      sucesso: true,
      mensagem: "Nível apagado com sucesso",
    };
  }
}

module.exports = new NivelService();

const FuncionarioRepository = require("../repositories/FuncionarioRepository");

class FuncionarioService {
  async listarFuncionarios() {
    const funcionarios = await FuncionarioRepository.findAll();
    return {
      sucesso: true,
      dados: funcionarios,
      total: funcionarios.length,
    };
  }

  async buscarFuncionarioPorId(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const funcionario = await FuncionarioRepository.findById(id);
    if (!funcionario) {
      throw { status: 404, mensagem: "Funcionário não encontrado" };
    }

    return { sucesso: true, dados: funcionario };
  }

  async cadastrarFuncionario(dados) {
    const { id_nivel, nome, email, senha, cpf } = dados || {};

    if (!id_nivel || Number.isNaN(Number(id_nivel))) {
      throw { status: 400, mensagem: "Campo id_nivel inválido" };
    }

    if (!nome || String(nome).trim() === "") {
      throw { status: 400, mensagem: "Nome é obrigatório" };
    }

    if (!email || String(email).trim() === "") {
      throw { status: 400, mensagem: "Email é obrigatório" };
    }

    if (!senha || String(senha).trim() === "") {
      throw { status: 400, mensagem: "Senha é obrigatória" };
    }

    if (!cpf || String(cpf).trim() === "") {
      throw { status: 400, mensagem: "CPF é obrigatório" };
    }

    const id = await FuncionarioRepository.create({
      id_nivel: Number(id_nivel),
      nome: String(nome).trim(),
      email: String(email).trim(),
      senha: String(senha),
      cpf: String(cpf).trim(),
    });

    return { sucesso: true, mensagem: "Funcionário cadastrado com sucesso", id };
  }

  async atualizarFuncionario(id, dados) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existente = await FuncionarioRepository.findById(id);
    if (!existente) {
      throw { status: 404, mensagem: "Funcionário não encontrado" };
    }

    const atualizacao = {};

    if (dados.id_nivel !== undefined) {
      if (Number.isNaN(Number(dados.id_nivel))) {
        throw { status: 400, mensagem: "Campo id_nivel inválido" };
      }
      atualizacao.id_nivel = Number(dados.id_nivel);
    }

    if (dados.nome !== undefined) {
      if (String(dados.nome).trim() === "") {
        throw { status: 400, mensagem: "Nome não pode ser vazio" };
      }
      atualizacao.nome = String(dados.nome).trim();
    }

    if (dados.email !== undefined) {
      if (String(dados.email).trim() === "") {
        throw { status: 400, mensagem: "Email não pode ser vazio" };
      }
      atualizacao.email = String(dados.email).trim();
    }

    if (dados.senha !== undefined) {
      if (String(dados.senha).trim() === "") {
        throw { status: 400, mensagem: "Senha não pode ser vazia" };
      }
      atualizacao.senha = String(dados.senha);
    }

    if (dados.cpf !== undefined) {
      if (String(dados.cpf).trim() === "") {
        throw { status: 400, mensagem: "CPF não pode ser vazio" };
      }
      atualizacao.cpf = String(dados.cpf).trim();
    }

    if (Object.keys(atualizacao).length === 0) {
      throw { status: 400, mensagem: "Nenhum dado válido enviado para atualização" };
    }

    await FuncionarioRepository.update(id, atualizacao);

    return { sucesso: true, mensagem: "Funcionário atualizado com sucesso" };
  }

  async deletarFuncionario(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw { status: 400, mensagem: "ID inválido" };
    }

    const existente = await FuncionarioRepository.findById(id);
    if (!existente) {
      throw { status: 404, mensagem: "Funcionário não encontrado" };
    }

    await FuncionarioRepository.delete(id);

    return { sucesso: true, mensagem: "Funcionário removido com sucesso" };
  }
}

module.exports = new FuncionarioService();

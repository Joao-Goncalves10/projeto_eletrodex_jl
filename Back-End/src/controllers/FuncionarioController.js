const FuncionarioService = require("../services/FuncionarioService");

class FuncionarioController {
  async listar(req, res) {
    try {
      const funcionarios = await FuncionarioService.listarFuncionarios();
      res.status(200).json(funcionarios);
    } catch (error) {
      const code = error.status || 500;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const funcionario = await FuncionarioService.buscarFuncionarioPorId(req.params.id);
      res.status(200).json(funcionario);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async cadastrar(req, res) {
    try {
      const resultado = await FuncionarioService.cadastrarFuncionario(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const resultado = await FuncionarioService.atualizarFuncionario(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async deletar(req, res) {
    try {
      const resultado = await FuncionarioService.deletarFuncionario(req.params.id);
      res.status(200).json(resultado);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }
}

module.exports = new FuncionarioController();

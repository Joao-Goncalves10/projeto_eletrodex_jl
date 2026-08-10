const NivelService = require("../services/nivelService");

class NivelController {
  async listar(req, res) {
    try {
      const niveis = await NivelService.listarNiveis();
      res.status(200).json(niveis);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar níveis", detalhe: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const nivel = await NivelService.buscarNivelPorId(id);
      res.status(200).json(nivel);
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async cadastrar(req, res) {
    try {
      const nivel = await NivelService.cadastrarNivel(req.body);
      res.status(201).json({
        mensagem: "Nível cadastrado com sucesso",
        nivel,
      });
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const nivelAtualizado = await NivelService.atualizarNivel(id, req.body);
      res.status(200).json({
        mensagem: "Nível atualizado com sucesso",
        nivel: nivelAtualizado,
      });
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }

  async deletar(req, res) {
    try {
      const id = req.params.id;
      await NivelService.deletarNivel(id);
      res.status(200).json({ mensagem: "Nível excluído com sucesso" });
    } catch (error) {
      const code = error.status || 400;
      res.status(code).json({ erro: error.mensagem || error.message });
    }
  }
}

module.exports = new NivelController();

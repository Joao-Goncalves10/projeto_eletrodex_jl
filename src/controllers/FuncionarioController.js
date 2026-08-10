const FuncionarioService = require('../services/FuncionarioService');

class FuncionarioController {
    async listar(req, res) {
        try {
            const resultado = await FuncionarioService.listarFuncionarios();
            res.json(resultado);
        } catch (erro) {
            const status = erro?.status || 500;
            const mensagem = erro?.mensagem || erro?.message || 'Erro interno do servidor';
            res.status(status).json({
                sucesso: false,
                mensagem,
                erro: erro?.stack || erro
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await FuncionarioService.buscarFuncionarioPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            const status = erro?.status || 500;
            const mensagem = erro?.mensagem || erro?.message || 'Erro interno do servidor';
            res.status(status).json({
                sucesso: false,
                mensagem,
                erro: erro?.stack || erro
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const resultado = await FuncionarioService.cadastrarFuncionario(req.body);
            res.status(201).json(resultado);
        } catch (erro) {
            const status = erro?.status || 500;
            const mensagem = erro?.mensagem || erro?.message || 'Erro interno do servidor';
            res.status(status).json({
                sucesso: false,
                mensagem,
                erro: erro?.stack || erro
            });
        }
    }

    async atualizar(req, res) {
        try {
            const resultado = await FuncionarioService.atualizarFuncionario(req.params.id, req.body);
            res.json(resultado);
        } catch (erro) {
            const status = erro?.status || 500;
            const mensagem = erro?.mensagem || erro?.message || 'Erro interno do servidor';
            res.status(status).json({
                sucesso: false,
                mensagem,
                erro: erro?.stack || erro
            });
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await FuncionarioService.deletarFuncionario(req.params.id);
            res.json(resultado);
        } catch (erro) {
            const status = erro?.status || 500;
            const mensagem = erro?.mensagem || erro?.message || 'Erro interno do servidor';
            res.status(status).json({
                sucesso: false,
                mensagem,
                erro: erro?.stack || erro
            });
        }
    }
}

module.exports = new FuncionarioController();

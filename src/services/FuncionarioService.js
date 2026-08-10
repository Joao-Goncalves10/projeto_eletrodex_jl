const FuncionarioRepository = require('../repositories/FuncionarioRepository');

class FuncionarioService {
    async listarFuncionarios() {
        const funcionarios = await FuncionarioRepository.findAll();
        return {
            sucesso: true,
            mensagem: 'Funcionários listados com sucesso',
            dados: funcionarios
        };
    }

    async buscarFuncionarioPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const funcionario = await FuncionarioRepository.findById(id);
        if (!funcionario) {
            throw { status: 404, mensagem: 'Funcionário não encontrado' };
        }

        return {
            sucesso: true,
            mensagem: 'Funcionário encontrado com sucesso',
            dados: funcionario
        };
    }

    async cadastrarFuncionario(dados) {
        if (!dados || !dados.id_nivel || !dados.nome || !dados.email || !dados.senha || !dados.cpf) {
            throw {
                status: 400,
                mensagem: 'id_nivel, nome, email, senha e cpf são obrigatórios'
            };
        }

        const id = await FuncionarioRepository.create(dados);
        return {
            sucesso: true,
            mensagem: 'Funcionário cadastrado com sucesso',
            id
        };
    }

    async atualizarFuncionario(id, dadosAtualizacao) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const funcionarioAtual = await FuncionarioRepository.findById(id);
        if (!funcionarioAtual) {
            throw { status: 404, mensagem: 'Funcionário não encontrado para atualização' };
        }

        await FuncionarioRepository.update(id, dadosAtualizacao);

        return {
            sucesso: true,
            mensagem: 'Funcionário atualizado com sucesso'
        };
    }

    async deletarFuncionario(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const funcionario = await FuncionarioRepository.findById(id);
        if (!funcionario) {
            throw { status: 404, mensagem: 'Funcionário não encontrado' };
        }

        await FuncionarioRepository.delete(id);

        return {
            sucesso: true,
            mensagem: 'Funcionário apagado com sucesso'
        };
    }
}

module.exports = new FuncionarioService();

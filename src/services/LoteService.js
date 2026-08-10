const LoteRepository = require('../repositories/LoteRepository');

class LoteService {
    async listarLotes() {
        const lotes = await LoteRepository.findAll();
        return {
            sucesso: true,
            mensagem: 'Lotes listados com sucesso',
            dados: lotes
        };
    }

    async buscarLotePorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const lote = await LoteRepository.findById(id);
        if (!lote) {
            throw { status: 404, mensagem: 'Lote não encontrado' };
        }

        return {
            sucesso: true,
            mensagem: 'Lote encontrado com sucesso',
            dados: lote
        };
    }

    async cadastrarLote(dados) {
        if (!dados || !dados.id_produto || !dados.quantidade || !dados.localizacao || !dados.data_entrada || !dados.responsavel || !dados.nota_fiscal || !dados.valor) {
            throw {
                status: 400,
                mensagem: 'id_produto, quantidade, localizacao, data_entrada, responsavel, nota_fiscal e valor são obrigatórios'
            };
        }

        const id = await LoteRepository.create(dados);
        return {
            sucesso: true,
            mensagem: 'Lote cadastrado com sucesso',
            id
        };
    }

    async atualizarLote(id, dadosAtualizacao) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const loteAtual = await LoteRepository.findById(id);
        if (!loteAtual) {
            throw { status: 404, mensagem: 'Lote não encontrado para atualização' };
        }

        await LoteRepository.update(id, dadosAtualizacao);

        return {
            sucesso: true,
            mensagem: 'Lote atualizado com sucesso'
        };
    }

    async deletarLote(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' };
        }

        const lote = await LoteRepository.findById(id);
        if (!lote) {
            throw { status: 404, mensagem: 'Lote não encontrado' };
        }

        await LoteRepository.delete(id);

        return {
            sucesso: true,
            mensagem: 'Lote apagado com sucesso'
        };
    }
}

module.exports = new LoteService();

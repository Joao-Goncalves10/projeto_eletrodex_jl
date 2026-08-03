const ProdutoRepository = require('../repositories/ProdutoRepository');
const fs = require('fs').promises;
const path = require('path');

class ProdutoService {
    // Caso precise adicionar, insira os métodos listarProdutos e buscarProdutoPorId aqui

    async cadastrarProduto(dados) {
        const id = await ProdutoRepository.create(dados);
        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso",
            id
        };
    }

    async atualizarProduto(id, dadosAtualizacao) {
        if (!id || isNaN(id)) {
            throw { status: 400, message: "ID inválido" };
        }

        const produtoAntigo = await ProdutoRepository.findById(id);
        if (!produtoAntigo) {
            throw { status: 404, message: "Produto não encontrado para atualização" };
        }

        if (dadosAtualizacao.imagem && produtoAntigo.imagem) {
            const caminhoArquivoAntigo = path.join(__dirname, '../../', produtoAntigo.imagem);
            await fs.unlink(caminhoArquivoAntigo).catch(() => {
                console.log("Aviso: Arquivo antigo não encontrado no disco para exclusão.");
            });
        }

        await ProdutoRepository.update(id, dadosAtualizacao);

        return {
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        };
    }

    async deletarProduto(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, message: "ID inválido" };
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw { status: 404, message: "Produto não encontrado" };
        }

        if (produto.imagem) {
            const caminhoArquivo = path.join(__dirname, '../../', produto.imagem);
            await fs.unlink(caminhoArquivo).catch(() => {});
        }

        await ProdutoRepository.delete(id);

        return {
            sucesso: true,
            mensagem: "Produto apagado com sucesso"
        };
    }
}

module.exports = new ProdutoService();
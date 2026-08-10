const ProdutoRepository = require('../repositories/ProdutoRepository');
const fs = require('fs').promises;
const path = require('path');

class ProdutoService {
    async listarProdutos() {
        const produtos = await ProdutoRepository.findAll();
        return {
            sucesso: true,
            mensagem: "Produtos listados com sucesso",
            dados: produtos
        };
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        return {
            sucesso: true,
            mensagem: "Produto encontrado com sucesso",
            dados: produto
        };
    }

    async cadastrarProduto(dados) {
        if (!dados || !dados.nome || !dados.descricao || !dados.preco) {
            throw { status: 400, mensagem: "Nome, descrição e preço são obrigatórios" };
        }

        const id = await ProdutoRepository.create(dados);
        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso",
            id
        };
    }

    async atualizarProduto(id, dadosAtualizacao) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const produtoAntigo = await ProdutoRepository.findById(id);
        if (!produtoAntigo) {
            throw { status: 404, mensagem: "Produto não encontrado para atualização" };
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
            throw { status: 400, mensagem: "ID inválido" };
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw { status: 404, mensagem: "Produto não encontrado" };
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
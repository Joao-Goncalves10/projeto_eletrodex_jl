const ProdutoService = require('../services/ProdutoService');
const path = require('path');
const fs = require('fs').promises;

class ProdutoController {
    async listar(req, res) {
        try {
            const resultado = await ProdutoService.listarProdutos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor"
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const resultado = await ProdutoService.cadastrarProduto(req.body);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor"
            });
        }
    }
    
    async uploadImagem(req, res) {
        const files = req.files && req.files.length ? req.files : (req.file ? [req.file] : []);

        if (!files || files.length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Arquivo inválido'
            });
        }

        const arquivos = files.map(f => ({
            fieldname: f.fieldname,
            filename: f.filename,
            path: f.path
        }));

        return res.status(200).json({
            sucesso: true,
            mensagem: arquivos.length > 1 ? 'Arquivos enviados com sucesso' : 'Arquivo enviado com sucesso',
            arquivos
        });
    }

    async deletar(req, res) {
        try {
            const resultado = await ProdutoService.deletarProduto(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor"
            });
        }
    }

    async cadastrarComImagem(req, res) {
        let caminhoImagem = null;
        try {
            const { nome, descricao, preco, categoria } = req.body;
            const file = req.file;

            // Validar dados obrigatórios
            if (!nome || !descricao || !preco) {
                if (file) {
                    await fs.unlink(file.path).catch(() => {}); // Deleta o arquivo enviado em caso de erro
                }
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nome, descrição e preço são obrigatórios"
                });
            }

            // Preparar caminho relativo da imagem
            if (file) {
                const relativePath = path.relative(path.join(__dirname, '../../'), file.path).replace(/\\/g, '/');
                caminhoImagem = relativePath.startsWith('uploads/')
                    ? relativePath
                    : `uploads/${relativePath}`;
            }

            const novoProduto = {
                nome,
                descricao,
                preco: parseFloat(preco),
                categoria: categoria || null,
                imagem: caminhoImagem
            };

            const resultado = await ProdutoService.cadastrarProduto(novoProduto);
            res.status(201).json(resultado);
        } catch (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro ao cadastrar produto",
                erro: erro.stack || erro
            });
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const file = req.file;
            const dadosAtualizacao = { ...req.body };

            // Se uma nova imagem foi enviada no PUT, processa o caminho dela
            if (file) {
                const relativePath = path.relative(path.join(__dirname, '../../'), file.path).replace(/\\/g, '/');
                dadosAtualizacao.imagem = relativePath.startsWith('uploads/')
                    ? relativePath
                    : `uploads/${relativePath}`;
            }

            if (dadosAtualizacao.preco) {
                dadosAtualizacao.preco = parseFloat(dadosAtualizacao.preco);
            }

            const resultado = await ProdutoService.atualizarProduto(id, dadosAtualizacao);
            res.json(resultado);
        } catch (erro) {
            // Em caso de erro na atualização, remove o arquivo que acabou de ser feito upload
            if (req.file) {
                await fs.unlink(req.file.path).catch(() => {});
            }
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }
}
        
module.exports = new ProdutoController();
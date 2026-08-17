const db = require('../db');

module.exports = {
  // GET /saida
  async listar(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM saida');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar saídas.' });
    }
  },

  // GET /saida/:id
  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await db.query('SELECT * FROM saida WHERE id_saida = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Registro de saída não encontrado.' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
  },

  // POST /saida
  async criar(req, res) {
    const { id_entrada, data_saida, nome_produto, id_produto, setor_produto, id_lote } = req.body;
    try {
      const [entrada] = await db.query('SELECT * FROM entrada WHERE id_entrada = ?', [id_entrada]);
      if (entrada.length === 0) {
        return res.status(400).json({ error: 'ID de entrada informado não existe.' });
      }

      // 2. Registrar a saída
      const query = `
        INSERT INTO saida (id_entrada, data_saida, nome_produto, id_produto, setor_produto, id_lote)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [id_entrada, data_saida, nome_produto, id_produto, setor_produto, id_lote]);
      
      return res.status(201).json({ id_saida: result.insertId, message: 'Saída registrada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar saída.' });
    }
  },

  // PUT /saida/:id
  async atualizar(req, res) {
    const { id } = req.params;
    const { id_entrada, data_saida, nome_produto, id_produto, setor_produto, id_lote } = req.body;
    try {
      const query = `
        UPDATE saida 
        SET id_entrada = ?, data_saida = ?, nome_produto = ?, id_produto = ?, setor_produto = ?, id_lote = ?
        WHERE id_saida = ?
      `;
      await db.query(query, [id_entrada, data_saida, nome_produto, id_produto, setor_produto, id_lote, id]);
      return res.status(200).json({ message: 'Saída atualizada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar saída.' });
    }
  },

  // DELETE /saida/:id
  async deletar(req, res) {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM saida WHERE id_saida = ?', [id]);
      return res.status(200).json({ message: 'Registro de saída removido.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover saída.' });
    }
  }
};
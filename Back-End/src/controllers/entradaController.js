const pool = require('../config/database');

module.exports = {
  async listar(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM entrada ORDER BY id_entrada DESC');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar registros de entrada.', detalhe: error.message });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM entrada WHERE id_entrada = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Registro de entrada não encontrado.' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar registro.', detalhe: error.message });
    }
  },

  async criar(req, res) {
    const { data_entrada, nome_produto, id_produto, setor_produto, id_lote } = req.body;
    try {
      const query = `
        INSERT INTO entrada (data_entrada, nome_produto, id_produto, setor_produto, id_lote)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.query(query, [data_entrada, nome_produto, id_produto, setor_produto, id_lote]);
      return res.status(201).json({ id_entrada: result.insertId, message: 'Entrada registrada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar entrada.', detalhe: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { data_entrada, nome_produto, id_produto, setor_produto, id_lote } = req.body;
    try {
      const query = `
        UPDATE entrada 
        SET data_entrada = ?, nome_produto = ?, id_produto = ?, setor_produto = ?, id_lote = ?
        WHERE id_entrada = ?
      `;
      await pool.query(query, [data_entrada, nome_produto, id_produto, setor_produto, id_lote, id]);
      return res.status(200).json({ message: 'Entrada atualizada com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar entrada.', detalhe: error.message });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM entrada WHERE id_entrada = ?', [id]);
      return res.status(200).json({ message: 'Entrada removida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover entrada.', detalhe: error.message });
    }
  }
};
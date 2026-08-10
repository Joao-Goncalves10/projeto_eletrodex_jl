const pool = require('../config/database');

const ALLOWED_COLUMNS = ['id_produto', 'quantidade', 'localizacao', 'data_entrada', 'responsavel', 'nota_fiscal', 'valor'];

class LoteRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM lote ORDER BY id_lote DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM lote WHERE id_lote = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0];
    }

    async create(loteData) {
        const { id_produto, quantidade, localizacao, data_entrada, responsavel, nota_fiscal, valor } = loteData;
        const [result] = await pool.query(
            'INSERT INTO lote (id_produto, quantidade, localizacao, data_entrada, responsavel, nota_fiscal, valor) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_produto, quantidade, localizacao, data_entrada, responsavel, nota_fiscal, valor]
        );
        return result.insertId;
    }

    async update(id, loteData) {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(loteData)) {
            if (ALLOWED_COLUMNS.includes(key)) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE lote SET ${fields.join(', ')} WHERE id_lote = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM lote WHERE id_lote = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new LoteRepository();

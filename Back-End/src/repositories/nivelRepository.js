const pool = require('../config/database')

class NivelRepository {
    async buscarTodos() {
        const [rows] = await pool.query('SELECT * FROM nivel ORDER BY id_nivel DESC')
        return rows
    }

    async buscarId(id) {
        const [rows] = await pool.query('SELECT * FROM nivel WHERE id_nivel = ?', [id])
        return rows[0]
    }

    async create(nivelData) {
        const { descricao } = nivelData;

        const [resultado] = await pool.query(
            'INSERT INTO nivel (descricao) VALUES (?)',
            [descricao]
        );

        return resultado.insertId;
    }

    async atualizarNivel(id, nivelData) {
        const { descricao } = nivelData;

        await pool.query('UPDATE nivel SET descricao = ? WHERE id_nivel = ?', [descricao, id])
    }

    async deletarNivel(id) {
        await pool.query('DELETE FROM nivel WHERE id_nivel = ?', [id])
    }
}

module.exports = new NivelRepository()
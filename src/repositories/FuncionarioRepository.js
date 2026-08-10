const pool = require('../config/database');

const ALLOWED_COLUMNS = ['id_nivel', 'nome', 'email', 'senha', 'cpf'];

class FuncionarioRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM funcionario ORDER BY id_funcionario DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM funcionario WHERE id_funcionario = ?', [id]);
        if (rows.length === 0) return null;
        return rows[0];
    }

    async create(funcionarioData) {
        const { id_nivel, nome, email, senha, cpf } = funcionarioData;
        const [result] = await pool.query(
            'INSERT INTO funcionario (id_nivel, nome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)',
            [id_nivel, nome, email, senha, cpf]
        );
        return result.insertId;
    }

    async update(id, funcionarioData) {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(funcionarioData)) {
            if (ALLOWED_COLUMNS.includes(key)) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE funcionario SET ${fields.join(', ')} WHERE id_funcionario = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM funcionario WHERE id_funcionario = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new FuncionarioRepository();

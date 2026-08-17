const pool = require("../config/database");

class FuncionarioRepository {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM funcionario ORDER BY id_funcionario DESC");
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM funcionario WHERE id_funcionario = ?", [id]);
    return rows[0] || null;
  }

  async create(funcionarioData) {
    const { id_nivel, nome, email, senha, cpf } = funcionarioData;

    const [result] = await pool.query(
      "INSERT INTO funcionario (id_nivel, nome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)",
      [id_nivel, nome, email, senha, cpf]
    );

    return result.insertId;
  }

  async update(id, funcionarioData) {
    const entries = Object.entries(funcionarioData);
    if (entries.length === 0) return null;

    const fields = entries.map(([key]) => `${key} = ?`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE funcionario SET ${fields.join(", ")} WHERE id_funcionario = ?`;
    const [result] = await pool.query(query, values);
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await pool.query("DELETE FROM funcionario WHERE id_funcionario = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = new FuncionarioRepository();

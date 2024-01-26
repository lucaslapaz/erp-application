const mysql = require("mysql2/promise");

// Criando um pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string),
});

// Função para obter uma conexão do pool
async function obterConexaoDoPool() {
  const connection = await pool.getConnection();
  return connection;
}

interface Data {
  [key: string]: string;
}

namespace model {
  /**
   *
   * @param {string} table Nome da tabela
   * @param {object} data Objeto com os dados a serem inseridos
   * @returns Retorna dados sobre a inserção na tabela
   */
  export async function DBCreate(table: string, data: object) {
    if (!table || !data) return new Error("Argumentos faltando!");

    const connection = await obterConexaoDoPool();

    const columns = Object.keys(data);
    const columnsString = columns.join(", ");
    const values = [Object.values(data)];

    const query: string = `INSERT INTO ${table} (${columnsString}) VALUES ?`;

    try {
      return await connection.query(query, [values]);
    } catch (error: any) {
      return error;
    } finally {
      connection.release(); // Liberando a conexão de volta para o pool
    }
  }

  export async function DBCreateMultiple(table: string, data: object[]) {
    if (!table || !data || data.length <= 0)
      return new Error("Argumentos faltando!");

    const connection = await obterConexaoDoPool();

    const columns = Object.keys(data[0]);
    const columnsString = columns.join(", ");
    const values: any[] = data.map((item) => Object.values(item));

    const query: string = `INSERT INTO ${table} (${columnsString}) VALUES ?`;

    try {
      return await connection.query(query, [values]);
    } catch (error: any) {
      return error;
    } finally {
      connection.release(); // Liberando a conexão de volta para o pool
    }
  }

  /**
   *
   * @param {string} _tabela Nome da tabela
   * @param {string[]} _colunas Colunas a serem consultadas e retornadas
   * @param {object} _dados Objeto com os valores a serem pesquisados
   * @returns Um array de objetos com os resultados
   */
  export async function DbRead(
    _tabela: string,
    _colunas: string[],
    _condicao: object = {}
  ) {
    if (!_tabela || !_colunas || !_condicao)
      return new Error("Argumentos faltando!");

    const conexao = await obterConexaoDoPool();

    let colunas: string = _colunas.join(", ");

    let query: string = "";

    if (Object.keys(_condicao).length > 0) {
      const keysCondicao = Object.keys(_condicao).map((item) => `${item} = ?`);
      const colunasCondicao = keysCondicao.join(" AND ");
      const valuesCondicao = Object.values(_condicao);
      query = `SELECT ${colunas} FROM ${_tabela} WHERE ${colunasCondicao};`;
    } else {
      query = `SELECT ${colunas} FROM ${_tabela};`;
    }

    try {
      const [rows, fields] = await conexao.execute(
        query,
        Object.values(_condicao)
      );
      if (rows.length == 0) {
        return new Error("Registro incorreto ou inexistente.");
      }
      return rows;
    } catch (error: any) {
      return new Error(error.message);
    } finally {
      conexao.release();
    }
  }

  /**
   *
   * @param {string} _tabela
   * @param {object} _valores Objeto com os novos valores
   * @param {object} _condicao Objeto com os valores atuais
   * @returns {number} Retorna um inteiro indicando quantos registros foram afetados
   */
  export async function DbUpdate(
    _tabela: string,
    _valores: object,
    _condicao: object
  ) {
    if (!_tabela || !_valores || !_condicao) {
      return new Error("Argumentos faltando!");
    }
    const conexao = await obterConexaoDoPool();

    const keysValores = Object.keys(_valores).map((item) => `${item} = ?`);
    const colunasValores = keysValores.join(", ");
    const valuesValores = Object.values(_valores);

    const keysCondicao = Object.keys(_condicao).map((item) => `${item} = ?`);
    const colunasCondicao = keysCondicao.join(" AND ");
    const valuesCondicao = Object.values(_condicao);

    const params = [...valuesValores, ...valuesCondicao];
    const query = `update ${_tabela} set ${colunasValores} WHERE ${colunasCondicao};`;

    try {
      let { affectedRows } = (await conexao.execute(query, params))[0];
      return affectedRows;
    } catch (error: any) {
      return new Error(error.message);
    } finally {
      conexao.release();
    }
  }

  export async function DbDelete(_tabela: string, _condicao: object) {
    const conexao = await obterConexaoDoPool();

    const keysCondicao: string[] = Object.keys(_condicao).map(
      (item) => `${item} = ?`
    );
    const colunasCondicao = keysCondicao.join(" AND ");
    const valuesCondicao = Object.values(_condicao);

    const query = `DELETE FROM ${_tabela} WHERE ${colunasCondicao};`;
    console.log(valuesCondicao);
    try {
      let { affectedRows } = (await conexao.execute(query, valuesCondicao))[0];
      return affectedRows;
    } catch (error: any) {
      return new Error(error.message);
    } finally {
      conexao.release();
    }
  }
}

// module.exports = model;
export default model;

const mysql = require("mysql2/promise");

// Criando um pool de conexões
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "#food#",
  database: "erp_lapaz",
  connectionLimit: 10,
});

// Função para obter uma conexão do pool
async function obterConexaoDoPool() {
  const connection = await pool.getConnection();
  return connection;
}

interface Dados {
  [key: string]: string;
}

function extrairDados(dados: object) {
  const keys = Object.keys(dados);
  const colunas = keys.join(", ");
  const params = keys.map(() => "?").join(", ");
  const values: string[] = [];

  for (let val in dados) {
    values.push((dados as Dados)[val]);
  }
  return [keys, colunas, params, values];
}

namespace model {
  /**
   *
   * @param {string} _tabela Nome da tabela
   * @param {object} _dados Objeto com os dados a serem inseridos
   * @returns Retorna dados sobre a inserção na tabela
   */
  export async function DbCreate(_tabela: string, _dados: object) {
    if (!_tabela || !_dados) return new Error("Argumentos faltando!");

    const conexao = await obterConexaoDoPool();

    const colunas = Object.keys(_dados);
    const colunasString = colunas.join(", ");
    const params = colunas.map((item) => `?`).join(", ");
    const values = Object.values(_dados);

    const query: string = `INSERT INTO ${_tabela} (${colunasString}) values (${params});`;

    try {
      return await conexao.execute(query, values);
    } catch (error: any) {
      return new Error(error.message);
    } finally {
      conexao.release(); // Liberando a conexão de volta para o pool
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
    _condicao: object
  ) {
    if (!_tabela || !_colunas || !_condicao)
      return new Error("Argumentos faltando!");

    const conexao = await obterConexaoDoPool();

    let colunas: string = _colunas.join(", ");

    const keysCondicao = Object.keys(_condicao).map((item) => `${item} = ?`);
    const colunasCondicao = keysCondicao.join(" AND ");
    const valuesCondicao = Object.values(_condicao);

    const query = `SELECT ${colunas} FROM ${_tabela} WHERE ${colunasCondicao};`;

    try {
      const [rows, fields] = await conexao.execute(query, valuesCondicao);
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

const sql = require("./db.js");

// constructor
const Vinculo = function (vinculo) {
  this.id = vinculo.id;
  this.fkIdEmpresas = vinculo.fkIdEmpresas;
  this.fkIdFornecedores = vinculo.fkIdFornecedores;
};

Vinculo.create = (newCustomer, result) => {
  sql.query("INSERT INTO vinculos SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vinculo: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Vinculo.findById = (customerId, result) => {
  sql.query(`SELECT * FROM vinculos WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vinculo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Vinculo with the id
    result({ kind: "not_found" }, null);
  });
};

Vinculo.getAll = result => {
  sql.query("SELECT vinculos.id, empresas.nome as empresa, empresas.cnpj, empresas.uf, fornecedores.nome as fornecedor, fornecedores.documento, fornecedores.nascimento FROM vinculos, empresas, fornecedores WHERE vinculos.fkIdEmpresas = empresas.id && vinculos.fkIdFornecedores = fornecedores.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vinculos: ", res);
    result(null, res);
  });
};

Vinculo.updateById = (id, vinculo, result) => {
  sql.query(
    "UPDATE vinculos SET fkIdEmpresas = ?, fkIdFornecedores = ? WHERE id = ?",
    [vinculo.fkIdEmpresas, vinculo.fkIdFornecedores, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Vinculo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vinculo: ", { id: id, ...vinculo });
      result(null, { id: id, ...vinculo });
    }
  );
};

Vinculo.remove = (id, result) => {
  sql.query("DELETE FROM vinculos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Vinculo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vinculo with id: ", id);
    result(null, res);
  });
};

Vinculo.removeAll = result => {
  sql.query("DELETE FROM vinculos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} vinculos`);
    result(null, res);
  });
};

module.exports = Vinculo;
const sql = require("./db.js");

// constructor
const Fornecedor = function(fornecedor) {
    this.id = fornecedor.id;
    this.nome = fornecedor.nome;
    this.documento = fornecedor.documento;
    this.email = fornecedor.email;
    //caso pessoa física
    this.rg = fornecedor.rg;
    this.nascimento = fornecedor.nascimento;
};

Fornecedor.create = (newCustomer, result) => {
  sql.query("INSERT INTO fornecedores SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created fornecedor: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Fornecedor.findById = (customerId, result) => {
  sql.query(`SELECT * FROM fornecedores WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found fornecedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Fornecedor with the id
    result({ kind: "not_found" }, null);
  });
};

Fornecedor.getAll = result => {
  sql.query("SELECT * FROM fornecedores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("fornecedores: ", res);
    result(null, res);
  });
};

Fornecedor.updateById = (id, fornecedor, result) => {
  sql.query(
    "UPDATE fornecedores SET nome = ?, rg = ?, documento = ?, email = ?, nascimento = ? WHERE id = ?",
    [fornecedor.nome, fornecedor.rg, fornecedor.documento, fornecedor.email, fornecedor.nascimento, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Fornecedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated fornecedor: ", { id: id, ...fornecedor });
      result(null, { id: id, ...fornecedor });
    }
  );
};

Fornecedor.remove = (id, result) => {
  sql.query("DELETE FROM fornecedores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Fornecedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted fornecedor with id: ", id);
    result(null, res);
  });
};

Fornecedor.removeAll = result => {
  sql.query("DELETE FROM fornecedores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} fornecedores`);
    result(null, res);
  });
};

module.exports = Fornecedor;
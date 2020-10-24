const sql = require("./db.js");

// constructor
const Empresa = function(empresa) {
    this.id = empresa.id;
    this.nome = empresa.nome;
    this.uf = empresa.uf;
    this.cnpj = empresa.cnpj;
};

Empresa.create = (newCustomer, result) => {
  sql.query("INSERT INTO empresas SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created empresa: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Empresa.findById = (customerId, result) => {
  sql.query(`SELECT * FROM empresas WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found empresa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Empresa with the id
    result({ kind: "not_found" }, null);
  });
};

Empresa.getAll = result => {
  sql.query("SELECT * FROM empresas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("empresas: ", res);
    result(null, res);
  });
};

Empresa.updateById = (id, empresa, result) => {
  sql.query(
    "UPDATE empresas SET nome = ?, uf = ?, cnpj = ? WHERE id = ?",
    [empresa.nome, empresa.uf, empresa.cnpj, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Empresa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated empresa: ", { id: id, ...empresa });
      result(null, { id: id, ...empresa });
    }
  );
};

Empresa.remove = (id, result) => {
  sql.query("DELETE FROM empresas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Empresa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted empresa with id: ", id);
    result(null, res);
  });
};

Empresa.removeAll = result => {
  sql.query("DELETE FROM empresas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} empresas`);
    result(null, res);
  });
};

module.exports = Empresa;
const Empresa = require("../models/empresa.model.js");

// Create and Save a new Empresa
exports.create = (req, res) => {
  
};

// Retrieve all Empresas from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Empresa with a empresaId
exports.findOne = (req, res) => {
  
};

// Update a Empresa identified by the empresaId in the request
exports.update = (req, res) => {
  
};

// Delete a Empresa with the specified empresaId in the request
exports.delete = (req, res) => {
  
};

// Delete all Empresas from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Empresa
    const empresa = new Empresa({
      nome: req.body.nome,
      uf: req.body.uf.toUpperCase(),
      cnpj: req.body.cnpj
    });
  
    // Save Empresa in the database
    Empresa.create(empresa, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Empresa."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Empresa.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving empresas."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Empresa.findById(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Empresa with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Empresa with id " + req.params.empresaId
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    req.body.uf = req.body.uf.toUpperCase();
    Empresa.updateById(
      req.params.empresaId,
      new Empresa(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Empresa with id ${req.params.empresaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Empresa with id " + req.params.empresaId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Empresa.remove(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Empresa with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Empresa with id " + req.params.empresaId
          });
        }
      } else res.send({ message: `Empresa was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Empresa.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Empresas were deleted successfully!` });
    });
  };
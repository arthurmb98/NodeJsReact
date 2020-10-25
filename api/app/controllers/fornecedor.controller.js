const Fornecedor = require("../models/fornecedor.model.js");

// Create and Save a new Fornecedor
exports.create = (req, res) => {
  
};

// Retrieve all Fornecedores from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Fornecedor with a empresaId
exports.findOne = (req, res) => {
  
};

// Update a Fornecedor identified by the empresaId in the request
exports.update = (req, res) => {
  
};

// Delete a Fornecedor with the specified empresaId in the request
exports.delete = (req, res) => {
  
};

// Delete all Fornecedores from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Fornecedor
    const fornecedor = new Fornecedor({
      nome: req.body.nome,
      email: req.body.email,
      documento: req.body.documento,
      rg: req.body.rg,
      nascimento: req.body.nascimento
    });
  
    // Save Fornecedor in the database
    Fornecedor.create(fornecedor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Fornecedor."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Fornecedor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fornecedores."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Fornecedor.findById(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Fornecedor with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Fornecedor with id " + req.params.empresaId
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
    Fornecedor.updateById(
      req.params.empresaId,
      new Fornecedor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Fornecedor with id ${req.params.empresaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Fornecedor with id " + req.params.empresaId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Fornecedor.remove(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Fornecedor with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Fornecedor with id " + req.params.empresaId
          });
        }
      } else res.send({ message: `Fornecedor was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Fornecedor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Fornecedores were deleted successfully!` });
    });
  };
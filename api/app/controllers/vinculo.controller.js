const Vinculo = require("../models/vinculo.model.js");

// Create and Save a new Vinculo
exports.create = (req, res) => {
  
};

// Retrieve all Vinculos from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Vinculo with a vinculoId
exports.findOne = (req, res) => {
  
};

// Update a Vinculo identified by the vinculoId in the request
exports.update = (req, res) => {
  
};

// Delete a Vinculo with the specified vinculoId in the request
exports.delete = (req, res) => {
  
};

// Delete all Vinculos from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Vinculo
    const vinculo = new Vinculo({
      fkIdEmpresas: req.body.fkIdEmpresas,
      fkIdFornecedores: req.body.fkIdFornecedores,
    });
  
    // Save Vinculo in the database
    Vinculo.create(vinculo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Vinculo."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Vinculo.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vinculos."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Vinculo.findById(req.params.vinculoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vinculo with id ${req.params.vinculoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Vinculo with id " + req.params.vinculoId
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
    Vinculo.updateById(
      req.params.vinculoId,
      new Vinculo(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Vinculo with id ${req.params.vinculoId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Vinculo with id " + req.params.vinculoId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Vinculo.remove(req.params.vinculoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vinculo with id ${req.params.vinculoId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Vinculo with id " + req.params.vinculoId
          });
        }
      } else res.send({ message: `Vinculo was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Vinculo.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Vinculos were deleted successfully!` });
    });
  };
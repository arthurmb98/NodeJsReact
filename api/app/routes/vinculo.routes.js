module.exports = app => {
    const vinculos = require("../controllers/vinculo.controller.js");
  
    // Create a new Customer
    app.post("/vinculos", vinculos.create);
  
    // Retrieve all Customers
    app.get("/vinculos", vinculos.findAll);
  
    // Retrieve a single Customer with vinculoId
    app.get("/vinculos/:vinculoId", vinculos.findOne);
  
    // Update a Customer with vinculoId
    app.put("/vinculos/:vinculoId", vinculos.update);
  
    // Delete a Customer with vinculoId
    app.delete("/vinculos/:vinculoId", vinculos.delete);
  
    // Create a new Customer
    app.delete("/vinculos", vinculos.deleteAll);
  };
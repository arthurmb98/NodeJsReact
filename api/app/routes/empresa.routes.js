module.exports = app => {
    const empresas = require("../controllers/empresa.controller.js");
  
    // Create a new Customer
    app.post("/empresas", empresas.create);
  
    // Retrieve all Customers
    app.get("/empresas", empresas.findAll);
  
    // Retrieve a single Customer with empresaId
    app.get("/empresas/:empresaId", empresas.findOne);
  
    // Update a Customer with empresaId
    app.put("/empresas/:empresaId", empresas.update);
  
    // Delete a Customer with empresaId
    app.delete("/empresas/:empresaId", empresas.delete);
  
    // Create a new Customer
    app.delete("/empresas", empresas.deleteAll);
  };
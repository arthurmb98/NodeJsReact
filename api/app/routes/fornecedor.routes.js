module.exports = app => {
    const fornecedores = require("../controllers/fornecedor.controller.js");
  
    // Create a new Customer
    app.post("/fornecedores", fornecedores.create);
  
    // Retrieve all Customers
    app.get("/fornecedores", fornecedores.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/fornecedores/:empresaId", fornecedores.findOne);
  
    // Update a Customer with customerId
    app.put("/fornecedores/:empresaId", fornecedores.update);
  
    // Delete a Customer with customerId
    app.delete("/fornecedores/:empresaId", fornecedores.delete);
  
    // Create a new Customer
    app.delete("/fornecedores", fornecedores.deleteAll);
  };
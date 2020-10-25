module.exports = app => {
    const fornecedores = require("../controllers/fornecedor.controller.js");
  
    // Create a new Customer
    app.post("/fornecedores", fornecedores.create);
  
    // Retrieve all Customers
    app.get("/fornecedores", fornecedores.findAll);
  
    // Retrieve a single Customer with fornecedorId
    app.get("/fornecedores/:fornecedorId", fornecedores.findOne);
  
    // Update a Customer with fornecedorId
    app.put("/fornecedores/:fornecedorId", fornecedores.update);
  
    // Delete a Customer with fornecedorId
    app.delete("/fornecedores/:fornecedorId", fornecedores.delete);
  
    // Create a new Customer
    app.delete("/fornecedores", fornecedores.deleteAll);
  };
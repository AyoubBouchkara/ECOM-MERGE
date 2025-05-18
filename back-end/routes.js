module.exports = app => {
    const ordersController = require('./controllers/orderController');
    const deliveryManController = require('./controllers/deliveryMan.controller.js');
    const lossessController = require('./controllers/losses.controller');
    const purchasesController = require('./controllers/purchase.controller');
    const paymentModeController = require('./controllers/paymentMode.controller.js');
    const storeController = require('./controllers/store.controller.js');

    
    //#region Orders

    app.get('/orders', ordersController.readData); // Read Data

    app.post('/orders', ordersController.createData); // Create Data
    
    app.put('/orders/:id', ordersController.updateData); // Update Data
    
    app.delete('/orders/:id', ordersController.deleteData); // Delete Data

    app.get('/ordersProfits', ordersController.calculProfits) // Calcul Profits

    app.get('/getDataForDelivery', ordersController.getDataForDelivery) // Calcul Profits


    //#endregion Orders

     //#region Losses
     app.get('/losses', lossessController.readData); // Read Data

     app.post('/losses', lossessController.createData); // Create Data
     
     app.put('/losses/:id', lossessController.updateData); // Update Data
     
     app.delete('/losses/:_id', lossessController.deleteData); // Delete Data
     //#endregion Losses
 
     //#region Purchase
     app.get('/purchases', purchasesController.readData); // Read Data
 
     app.post('/purchases', purchasesController.createData); // Create Data
          
     app.put('/purchases/:id', purchasesController.updateData); // Update Data
          
     app.delete('/purchases/:id', purchasesController.deleteData); // Delete Data
     //#endregion Purchase

     //#region DeliveryMan
    app.get('/deliverymen', deliveryManController.readData); // Read Data
    app.post('/deliverymen', deliveryManController.createData); // Create Data
    app.put('/deliverymen/:id', deliveryManController.updateData); // Update Data
    app.delete('/deliverymen/:id', deliveryManController.deleteData); // Delete Data
    //#endregion DeliveryMan    
    
    //#region Stores
    app.get('/store', storeController.readData); // Read Data
    app.post('/store', storeController.createData); // Create Data
    app.put('/store/:id', storeController.updateData); // Update Data
    app.delete('/store/:id', storeController.deleteData); // Delete Data
    //#endregion Stores  

    
    // Landing pages



    // profile 

    app.get('/payment-modes', paymentModeController.readData); // Read all payment modes
    app.post('/payment-modes', paymentModeController.createData); // Create a new payment mode
    app.put('/payment-modes/:id', paymentModeController.updateData); // Update a payment mode by ID
    app.delete('/payment-modes/:id', paymentModeController.deleteData); // Delete a payment 
};
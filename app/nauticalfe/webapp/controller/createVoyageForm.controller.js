sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Table",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/ColumnListItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Dialog, Table, Column, ColumnListItem,Text) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.createVoyageForm", {
            onInit: function () {
                var oView = this.getView();

      // Button event handlers
      // oView.byId("_IDGenButton1").attachPress(function () {
      //   alert("Create Voyage button clicked!");
      // });
      
      oView.byId("_IDGenButton2").attachPress(function () {
        alert("Freight Simulator button clicked!");
      });

      oView.byId("_IDGenButton3").attachPress(function () {
        alert("Calculate button clicked!");
      });

      oView.byId("_IDGenButton4").attachPress(function () {
        alert("Refresh button clicked!");
      });
    },
    showValueHelpDialog: function () {
      // Create a dialog
      var oDialog = new sap.m.Dialog({
          title: "Select: Voyage Types",
          contentWidth: "80%",
          contentHeight: "80%",
  
          content: new sap.m.Table({
              columns: [
                  new sap.m.Column({
                      header: new Text({ text: "Voyage Type" }),
                  }),
                  new sap.m.Column({
                      header: new Text({ text: "Description" }),
                  }),
                  // Add more columns as needed
              ],
              items: [
                  new sap.m.Table.ColumnListItem({
                      cells: [
                          new sap.m.Text({ text: "1001" }), // Replace with your data or fixed values
                          new sap.m.Text({ text: "1002" }), // Replace with your data or fixed values
                          // Add more cells as needed
                      ],
                  }),
                  new sap.m.Table.ColumnListItem({
                      cells: [
                          new sap.m.Text({ text: "Voyage Charter" }), // Replace with your data or fixed values
                          new sap.m.Text({ text: "Time Charter" }), // Replace with your data or fixed values
                          // Add more cells as needed
                      ],
                  }),
              ],
          }),
          beginButton: new Button({
              text: "OK", // Change "Close" to "OK"
              press: function () {
                  oDialog.close();
              },
          }),
          endButton: new Button({
              text: "Cancel", // Add a "Cancel" button
              press: function () {
                  oDialog.close();
              },
          }),
      });
  
      // Bind the dialog to the view
      this.getView().addDependent(oDialog);
  
      // Open the dialog
      oDialog.open();
  },
    onCreateVoyage: function() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("RouteView3");
  },
    
  });
});
 
            
        
    
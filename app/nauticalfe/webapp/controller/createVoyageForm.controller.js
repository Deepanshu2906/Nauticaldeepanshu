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
    populateInputField: function (inputField, selectedValue) {
        inputField.setValue(selectedValue);
    },
    showValueHelpDialog1: function () {
        // Create a dialog
        console.log("clicked");
        var oDialog = new sap.m.Dialog({
            title: "Select: Voyage Types",
            contentWidth: "60%",
            contentHeight: "60%",
            content: new sap.m.Table({
                mode: sap.m.ListMode.SingleSelectMaster,
                columns: [
                    new sap.m.Column({
                        header: new sap.m.Text({ text: "Voyage Type" }),
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({ text: "Description" }),
                    }),
                ],
                items: [
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "1001" }),
                            new sap.m.Text({ text: "Voyage Charter" }),
                        ],
                    }),
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "1002" }),
                            new sap.m.Text({ text: "Time Charter" }),
                        ],
                    }),
                    // Add more ColumnListItems as needed
                ],
                selectionChange: function (oEvent) {
                    var oSelectedItem = oEvent.getParameter("listItem");
                    var oSelectedValue = oSelectedItem.getCells()[0].getText();
                    var inputVoyageType = this.getView().byId("_IDGenInput2"); // Input field for Voyage Type
                    this.populateInputField(inputVoyageType, oSelectedValue);
                    oDialog.close();
                  }.bind(this),
                }),
            beginButton: new sap.m.Button({
                text: "Close",
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
 
            
        
    
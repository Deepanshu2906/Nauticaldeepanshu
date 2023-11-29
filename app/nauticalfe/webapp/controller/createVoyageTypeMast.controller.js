// const { location } = require("express/lib/response");

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/odata/v4/Context",
    "sap/ui/model/odata/v4/ODataContextBinding",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  ],
  function (BaseController, ODataModel, Context, MessageBox, ODataContextBinding, MessageToast) {
    "use strict";
    let aSelectedIds = [];
    var emptyrowAdded=0;

    let rowData = {};
    return BaseController.extend("nauticalfe.controller.createVoyageTypeMast", {
      onInit: function () {

        // this.onCreateDialog();

      },
      
      onTableUpdateFinished: function (oEvent) {
        console.log(("table updated"));
        let oTable = oEvent.getSource();
        
        // Get the binding information
        let oBindingInfo = oTable.getBindingInfo("items");
        
        // Get the number of items displayed in the table
        let iDisplayedItems = oTable.getItems().length;
        
        // Log or display the information
        console.log("Binding Path:", oBindingInfo.path);
        console.log("Number of Items Displayed:", iDisplayedItems);
        this.ensureMinimumRows(iDisplayedItems);
        
        // this.getView().getModel().refresh();
      },
      ensureMinimumRows: function (iDisplayedItems) {
        let oTable = this.byId("createTypeTable");
        let numRowsToAdd = (8+emptyrowAdded) - iDisplayedItems;
        console.log(numRowsToAdd);
        if (numRowsToAdd > 0) {
          for (let i = 0; i < numRowsToAdd; i++) {
            let oRow = new sap.m.ColumnListItem(); // Create an empty row
            // Add cells for each column in the table
            oRow.addCell(new sap.m.Input());
            oRow.addCell(new sap.m.Input()); // Add cells for each field/column you want to display
            // Add more cells if needed for other fields
            oTable.addItem(oRow); // Add the empty row to the table
          }
        }
        
      },
      onAddRow: function () {
        let oTable = this.byId("createTypeTable");
        emptyrowAdded++;
        
        
        // Get the number of items displayed in the table
        let iDisplayedItems = oTable.getItems().length;
        
        
        console.log("Number of Items Displayed:", iDisplayedItems);
        let numRowsToAdd = 8 - iDisplayedItems;
        
        console.log("adding One row", numRowsToAdd);
        var oRow = new sap.m.ColumnListItem(); // Create an empty row
        // Add cells for each column in the table
        oRow.addCell(new sap.m.Input({ maxLength: 4 }));
        oRow.addCell(new sap.m.Input()); // Add cells for each field/column you want to display
        // Add more cells if needed for other fields
        oTable.addItem(oRow); // Add the empty row to the table
        
        
      },
      // onCreateDialog: function () {
      //   var oView = this.getView();
      //   var oDialog = oView.byId("createDialog");
        
      //   if (!oDialog) {
      //     oDialog = new sap.m.Dialog("createDialog", {
      //       title: "Create New Entry",
      //       contentWidth: "400px",
      //       content: new sap.m.VBox({
      //         items: [
      //           new sap.m.Label({ text: " Voyage Code " }),
      //           new sap.m.Input({ value: "", id: "inputCode", required: true }), // Corrected ID
      //           new sap.m.Label({ text: "Description" }),
      //           new sap.m.Input({ value: "", id: "inputDescription", required: true }) // Corrected ID
      //         ]
      //       }),
      //       beginButton: new sap.m.Button({
      //         text: "Close",
      //         press: function () {
      //           oDialog.close();
      //         },
      //     }),
      //     endButton: new sap.m.Button({
      //       text: "Create",
      //         press: function (){
      //           oDialog.onCreateEntry()
      //         }
      //       })
      //     });
      //     oView.addDependent(oDialog);
      //   }
      //   oDialog.open();
        
      // },
      // onCreateForm: function(){
      //   let oDialog = this.byId("createDialog")
      //   console.log("clicked",oDialog);
      //   oDialog.open();
      //   if( oDialog){
      //   }

      // },
      
      // onCreateEntry: function () {
      //   var oView = this.getView();
      //   var oCodeInput = oView.byId("inputCode");
      //   var oDescInput = oView.byId("inputDescription");
      
      //   if (!oCodeInput || !oDescInput) {
      //     sap.m.MessageToast.show("Inputs not found or initialized properly.");
      //     return;
      //   }
      
      //   var sCode = oCodeInput.getValue();
      //   var sDescription = oDescInput.getValue();
      
      //   if (!sCode.trim() || !sDescription.trim()) {
      //     sap.m.MessageToast.show("Please fill in all required fields.");
      //     return;
      //   }
      
      //   // Your logic to create the entry goes here
      
      //   this.onCancel(); // Close the dialog after successful creation
      // },
      onCreate: function () {
        // this.selectedItems(oEvent);
        console.log(rowData);
        // if (rowData.VOYCD == "" || rowData.VOYDES == '') {
        //   MessageToast.show("Please fill the required fields");
        //   // this.byId('createTable').removeSelections();

        //   return;
        // }

        let that = this.getView();

        let data = {
          "VOYCD": rowData.VOYCD,
          "VOYDES": rowData.VOYDES
        }
        let JsonData = JSON.stringify(data)
        // console.log(JsonData);

        let EndPoint = "/odata/v4/nautical/VOYTYP";
        fetch(EndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JsonData
        })
          .then((res,error) => {
            if (res) {
              console.log(res);
              console.log(res.status, res.ok, res.message);
              
              if (res.status == "201") {

                console.log("Entity created successfully");
                MessageToast.show("Created succesfully");
                emptyrowAdded++;
                that.getModel().refresh();
                // location.reload();
                // that.byId('createTable').removeSelections();

              }else {
                // Check if the response contains a message
                res.json().then((data) => {
                    if (data && data.error && data.error.message) {
                        // Show the error message from the backend
                        MessageToast.show(data.error.message);
                    }
                });
            }

            }
            else {
              console.log("Failed and response with code : ", res.status);
            }
          })
          .catch(function (err) {
            console.log("error", err);
          })
      },
      selectedItems: function (oEvent) {
        // console.log("hello");
        let oTable = oEvent.getSource();
        let aSelectedItems = oTable.getSelectedItems();

        aSelectedIds = aSelectedItems.map(function (oSelectedItem) {

          // console.log(oSelectedItem);
          // console.log(oSelectedItem.getBindingContext());

          if (oSelectedItem.getBindingContext()) {

            let cells = oSelectedItem.getCells();
            if (cells.length > 1 && cells[1].isA("sap.m.Input")) {
              let inputField = cells[1]; // Get the input field in the second cell

              // Toggle the 'editable' property based on selection state
              if (oSelectedItem.getSelected()) {
                  inputField.setEditable(true); // Set editable to true if selected
              } else {
                  inputField.setEditable(false); // Set editable to false if deselected
              } 
          }
            return oSelectedItem.getBindingContext().getProperty("VOYCD")

          } else {

            let cells = oSelectedItem.getCells();
            console.log(cells);
            rowData.VOYCD = cells[0].getValue(); // Assuming the first cell holds VOYCD
            rowData.VOYDES = cells[1].getValue();
            console.log(rowData);
            return rowData

          }

        });
        console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
        return aSelectedIds;

      },

      //  Function  for  updating  an row
      onUpdate: function () {
        let oView = this.getView();
        if( aSelectedIds.length == 0) {
         MessageToast.show("Please select  a  row");
         return
        }
        if( aSelectedIds.length >1) {
            MessageToast.show("Please select  one  row only ");
          return
         }
        
       console.log("update press");
       var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        
       var oVoyageUpdate = {
           "VOYCD": aSelectedIds[0], // Provide the Voyage Type code you want to update
           "VOYDES": rowData.VOYDES // Update with the new Description 
       }
   
       var JsonData = JSON.stringify(oVoyageUpdate);
   
       let EndPoint = "/odata/v4/nautical/VOYTYP/" + oVoyageUpdate.VOYCD ; // Adjust the endpoint as needed
       // let EndPoint = "/odata/v4/travel/insertTravel"; // Adjust the endpoint as needed
       console.log(EndPoint);

       fetch(EndPoint, {
           method: 'PATCH', // Use PUT for updating existing resource
           headers: {
               'Content-Type': 'application/json'
           },
           body: JsonData
       })
       .then(function (res) {
           if (res.ok) {
               console.log("Voyage entity Description updated Successfully");
               MessageToast.show("Voyage entity Description updated Successfully");
             
             oView.getModel().refresh();
           } else {
             // Check if the response contains a message
             res.json().then((data) => {
              if (data && data.error && data.error.message) {
                  // Show the error message from the backend
                  MessageToast.show(data.error.message);
              }
              });
              //  console.log("Failed to update Voyage Type entity");
           }
       })
       .catch(function (err) {
           console.log("Error:", err);
       })
       

      },
      onDeleteVoyageType: function () {

        let aItems = this.byId("createTypeTable").getSelectedItems();

        if (!aItems.length) {

          MessageToast.show("nothing selected");

          return;
        }

        aItems.forEach(function (oItem) {
          console.log(oItem);

          oItem.getBindingContext().delete().catch(function (oError) {

            if (!oError.canceled) {

              // error was already reported to message model

            }

          });

        });

      }
    });



  });



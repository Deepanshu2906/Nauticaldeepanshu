
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
      return BaseController.extend("nauticalfe.controller.CurrencyMaster", {
        onInit: function () {
  
  
        },
        
        onTableUpdateFinished: function (oEvent) {
          console.log((" Currency table updated"));
          let oTable = oEvent.getSource();
          
          // Get the binding information
          let oBindingInfo = oTable.getBindingInfo("items");
          
          // Get the number of items displayed in the table
          let iDisplayedItems = oTable.getItems().length;
          
          // Log or display the information
          // console.log("Binding Path:", oBindingInfo.path);
          console.log("Number of Items Displayed:", iDisplayedItems);
          // this.ensureMinimumRows(iDisplayedItems);
          
        },
        ensureMinimumRows: function (iDisplayedItems) {
          let oTable = this.byId("createTypeTable");
          let numRowsToAdd = (9) - iDisplayedItems;
          console.log(numRowsToAdd);
          if (numRowsToAdd > 0) {
            for (let i = 0; i < numRowsToAdd; i++) {
              let oRow = new sap.m.ColumnListItem(); // Create an empty row
              // Add cells for each column in the table
              oRow.addCell(new sap.m.Input({ maxLength: 4 }));
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
        
        onShowDialogForCreate: function( ){
          let oDialog = this.byId("helloDialog")
          // console.log("clicked",oDialog);
          if( oDialog){
            
            oDialog.open();
          }
  
        },
        openDialogForUpdate : function(){
          let oDialog = this.byId("helloDialog2")
          // console.log("clicked",oDialog);
          let code1 = this.getView().byId("charterCode2");
          let desc1 = this.getView().byId("charterDesc2");
          console.log(aSelectedIds[0], rowData.CARDES );
          code1.setValue(aSelectedIds[0][0]);
          desc1.setValue(aSelectedIds[0][1]);
          if( oDialog){
            
            oDialog.open();
          }
  
  
        },
        handleCloseCreate: function (){
          let oDialog = this.byId("helloDialog")
          // console.log("clicked",oDialog);
          if( oDialog){
            
            oDialog.close();
          }
        },
        handleCloseUpdate : function(){
          let oDialog = this.byId("helloDialog2")
          // console.log("clicked",oDialog);
          if( oDialog){
            
            oDialog.close();
          }
  
        },
        
        onCreateEntry: function () {
          var oView = this.getView();
          var oCodeInput = oView.byId("charterCode");
          var oDescInput = oView.byId("charterDesc");
          
          if (!oCodeInput || !oDescInput) {
            sap.m.MessageToast.show("Inputs not found or initialized properly.");
            return;
          }
          
          var sCode = oCodeInput.getValue();
          var sDescription = oDescInput.getValue();
          console.log(sCode, sDescription);
        
          if (!sCode.trim() || !sDescription.trim()) {
            sap.m.MessageToast.show("Please fill in all required fields.");
            return;
          }
        
          // Your logic to create the entry goes here
          rowData.NAVOYCUR = sCode;
          rowData.NAVOYGCURDES = sDescription.toUpperCase();
          this.onCreate(); // Close the dialog after successful creation
  
          // after hitting dialog box  closing the dialog box 
          let oDialog = this.byId("helloDialog")
          // console.log("clicked",oDialog);
          if( oDialog){
            oDialog.close();
          }
  
        },
        onCreate: function () {
          
          console.log(rowData);
          
  
          let that = this.getView();
  
          let data = {
            "NAVOYCUR": rowData.NAVOYCUR,
            "NAVOYGCURDES": rowData.NAVOYGCURDES
          }
          let JsonData = JSON.stringify(data)
          // console.log(JsonData);
  
          let EndPoint = "/odata/v4/nautical/CURR";
          fetch(EndPoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JsonData
          })
            .then((res,error) => {
              if (res) {
                // console.log(res);
                // console.log(res.status, res.ok, res.message);
                
                if (res.status == "201") {
  
                  console.log("Entity created successfully");
                  MessageToast.show("Entry Created Successfully.");
                  emptyrowAdded++;
                  that.getModel().refresh();
                  if(aSelectedIds.length){

                      this.getView().byId('createTypeTable').removeSelections();
                    }
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
  
            // console.log(oSelectedItem.getBindingContext());
  
            if (oSelectedItem.getBindingContext()) {
  
              let cells = oSelectedItem.getCells();
              // console.log(cells);
              
              return [oSelectedItem.getBindingContext().getProperty("NAVOYCUR"), oSelectedItem.getBindingContext().getProperty("NAVOYGCURDES")]
  
            } 
  
          });
          console.log(aSelectedIds);
          // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
          return aSelectedIds;
  
        },
        // function for pop up dialog box for update
        onShowUpdateDialog: function(){
          
          let oTable = this.getView().byId('createTypeTable');
          if( aSelectedIds.length == 0) {
            MessageToast.show("Please select  a  row");
            return
          }
          if( aSelectedIds.length > 1) {
            MessageToast.show("Please select  one  row only ");
            return
          }
          this.getView().byId('charterDesc2').setValue(aSelectedIds[0][1]);
           this.openDialogForUpdate();
          
  
        },
  
        //  Function  for  updating  an row
        onUpdate: function () {
          let oTable = this.getView().byId('createTypeTable');
        //   if( aSelectedIds.length == 0) {
        //    MessageToast.show("Please select  a  row");
        //    return
        //   }
        //   if( aSelectedIds.length >1) {
        //       MessageToast.show("Please select  one  row only ");
        //     return
        //    }
          
        //  console.log("update press");
        //  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        // console.log('rowData ->', rowData);

        rowData.NAVOYGCURDES = this.getView().byId("charterDesc2").getValue().toUpperCase();

         var oVoyageUpdate = {
             "NAVOYCUR": aSelectedIds[0][0], // Provide the Voyage Type code you want to update
             "NAVOYGCURDES": rowData.NAVOYGCURDES // Update with the new Description 
         }
        //  console.log(oVoyageUpdate);
     
         var JsonData = JSON.stringify(oVoyageUpdate);
     
         let EndPoint = "/odata/v4/nautical/CURR/" + oVoyageUpdate.NAVOYCUR ; // Adjust the endpoint as needed
         
        //  console.log(EndPoint);
  
         fetch(EndPoint, {
             method: 'PATCH', // Use PUT for updating existing resource
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JsonData
         })
         .then( (res) =>{
             if (res.ok) {
                 console.log("Item updated Successfully");
                 MessageToast.show(" Item updated Successfully");
               
               this.getView().getModel().refresh();
               this.handleCloseUpdate();
               this.getView().byId('createTypeTable').removeSelections();
               aSelectedIds =[];
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
  
            MessageToast.show("Please Select items ");
  
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
  
  
  
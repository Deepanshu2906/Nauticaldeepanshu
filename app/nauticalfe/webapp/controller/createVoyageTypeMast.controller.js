sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/odata/v4/Context",
    "sap/ui/model/odata/v4/ODataContextBinding",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  ],
  function (BaseController, ODataModel, Context, MessageBox,ODataContextBinding, MessageToast) {
    "use strict";
    var aSelectedIds=[];

    return BaseController.extend("nauticalfe.controller.createVoyageTypeMast", {
      onInit: function () {
         // Fetch the table
        // this.oTable = this.byId("createTypeTable");

         
         // Ensure minimum of 6 rows are displayed
         
         
        } ,
        onTableUpdateFinished: function (oEvent) {
          var oTable = oEvent.getSource();
          
          // Get the binding information
          var oBindingInfo = oTable.getBindingInfo("items");
          
          // Get the number of items displayed in the table
          var iDisplayedItems = oTable.getItems().length;
          
          // Log or display the information
          console.log("Binding Path:", oBindingInfo.path);
          console.log("Number of Items Displayed:", iDisplayedItems);
          this.ensureMinimumRows(iDisplayedItems);
        },
      ensureMinimumRows: function (iDisplayedItems) {
        var oTable = this.byId("createTypeTable");
        var numRowsToAdd = 6 - iDisplayedItems;
        console.log(numRowsToAdd);
        if (numRowsToAdd > 0) {
          for (var i = 0; i < numRowsToAdd; i++) {
            var oRow = new sap.m.ColumnListItem(); // Create an empty row
            // Add cells for each column in the table
            oRow.addCell(new sap.m.Input());
            oRow.addCell(new sap.m.Input()); // Add cells for each field/column you want to display
            // Add more cells if needed for other fields
            oTable.addItem(oRow); // Add the empty row to the table
          }
        }
      },
      onCreate: function () {
        var oView = this.getView();

        var data = {
          "VOYCD": "2222",
          "VOYDES":"testing charter"
        }
        var JsonData = JSON.stringify(data)
                // console.log(JsonData);

                let EndPoint = "/odata/v4/nautical/VOYTYP";
                fetch(EndPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JsonData
                })
                    .then(function (res) {
                        if (res) {
                          console.log(res.status);
                          
                            console.log("Entity created successfully");
                            
                            oView.getModel().refresh();
                        }
                        else {
                            console.log("Failed and response with code : ", res.status);
                        }
                    })
                    .catch(function (err) {
                        console.log("error", err);
                    })
      },
      selectedItems : function(oEvent){
        // console.log("hello");
        var oTable = oEvent.getSource();
        var aSelectedItems = oTable.getSelectedItems();
        
         aSelectedIds = aSelectedItems.map(function(oSelectedItem) {
            return oSelectedItem.getBindingContext().getProperty("VOYCD")
        });
       console.log(aSelectedIds);
        // console.log("Selected Travel IDs: " + aSelectedTravelIds.join(","));
        return aSelectedIds;
             
      },
      onUpdate : function(){

      },
      onDeleteVoyageType : function () {

        var aItems = this.byId("createTypeTable").getSelectedItems();

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
  


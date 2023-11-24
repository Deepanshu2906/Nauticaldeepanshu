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

    return BaseController.extend("nauticalfe.controller.createVoyageTypeMast", {
      onInit: function () {
         // Fetch the table
        this.oTable = this.byId("createTypeTable");

         this.oTable.bindItems({
          path: "/VOYTYP",
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Input({ value: "{VOYCD}" }),
              new sap.m.Input({ value: "{VOYDES}" })
              // Add more cells if needed for other fields
            ]
          })
        });
         // Ensure minimum of 6 rows are displayed
         this.ensureMinimumRows();
         
         
        } ,
        ensureMinimumRows: function () {
        var oTable = this.byId("createTypeTable");
        var numRowsToAdd = 6 - oTable.getItems().length;
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
      }
      ,
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
  


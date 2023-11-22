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
      } ,
      onCreate: function () {
        var oView = this.getView();

        var data = {
          "VOYCD": "2222",
          "VOYDES":"testing charter"
        }
        var JsonData = JSON.stringify(data)
                console.log(JsonData);

                let EndPoint = "/odata/v4/create-voyage-service/VOYTYP";
                fetch(EndPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JsonData
                })
                    .then(function (res) {
                        if (res) {
                            console.log("Entity created successfully");
                            
                            oView.getModel().refresh();
                        }
                        else {
                            console.log("Failed");
                        }
                    })
                    .catch(function (err) {
                        console.log("error", err);
                    })
      },
      onDeleteLineItem : function () {

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
  


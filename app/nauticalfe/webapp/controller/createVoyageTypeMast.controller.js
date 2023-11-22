sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.createVoyageTypeMast", {
        onInit: function() {
        },

        onDeleteRow: function(oEvent) {
            var oTable = this.getView().byId("myTable");
            var oSelectedItem = oEvent.getSource().getParent();
            var iIndex = oTable.indexOfItem(oSelectedItem);
      
            var oModel = this.getView().getModel();
            var aData = oModel.getProperty("/tableData");
            aData.splice(iIndex, 1);
            oModel.setProperty("/tableData", aData);
          },
      
          onAddRow: function() {
            var oModel = this.getView().getModel();
            var aData = oModel.getProperty("/tableData");
            aData.push({ VOYCD: "", VOYDES: "" });
            oModel.setProperty("/tableData", aData);
          }
      });
    }
  );
  
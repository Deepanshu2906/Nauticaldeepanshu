sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.MastView", {
        onInit() {
        },
        navToCharterType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("voyageType")

        },
        navToVesselType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("vesselType")

        },
        navToCurrencyType: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CurrencyTypeMaster")

        }
      });
    }
  );
  
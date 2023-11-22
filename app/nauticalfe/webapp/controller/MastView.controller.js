sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("nauticalfe.controller.MastView", {
        onInit() {
        },
        press1: function(){
          const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("voyageType")

        }
      });
    }
  );
  
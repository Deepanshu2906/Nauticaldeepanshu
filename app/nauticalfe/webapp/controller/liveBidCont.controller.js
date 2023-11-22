sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator,FilterType) {
        "use strict";
 
        return Controller.extend("nauticalfe.controller.liveBidCont", {
            onInit: function () {
                console.log("hello");
                let oView = this.getView();
                console.log(oView);

                // let bidModel = oView.getModel("bidData");
                // console.log(bidModel);
                // if( bidModel){
                //     this.updateStatusCounts(bidModel);
                // }
 
            },
            // updateStatusCounts : function (dataModel){
            //     let statusCounts = {
            //         open: 0,
            //         Ongoing:0,
            //         Closed:0
            //     };
            //     let allItemCount = dataModel.getData();
            //     console.log((allItemCount)); 
            //     dataModel.getData().forEach(function(item){
            //         switch (item.Status){
            //             case 'open':
            //                 statusCounts.open++;
            //                 break;
            //                 case 'Ongoing':
            //                 statusCounts.Ongoing++;
            //                 break;

            //                 case 'Closed':
            //                     statusCounts.Closed++;
            //                     break;                  
                            
            //         }
            //     });
            //     let oView = this.getView();
            //     oView.byId('closeTileNumericId').setValue(statusCounts.Closed);
            //     oView.byId('ongoingTileNumericId').setValue(statusCounts.Ongoing);
            //     oView.byId('openTileNumericId').setValue(statusCounts.open);

            // },
            onPressBidTableData(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteBidObj", {
                    bidObjPath: window.encodeURIComponent(oItem.getBindingContext("bidData").getPath().substr(1))
                });
            },
            closeTile : function(oEvent){
                console.log("clicked close");
                let oTable = this.getView().byId("table");
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"Closed");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
    
            },
            openTile : function(oEvent){
                console.log("clicked open");
                let oTable = this.getView().byId("table");
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"open");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
    
            },
            ongoingTile : function(oEvent){
                console.log("clicked ongoing");
                let oTable = this.getView().byId("table");
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator.Contains,"Ongoing");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
    
            },
            allTile : function(oEvent){
                console.log("clicked all");
                let oTable = this.getView().byId("table");
                let oFilter = new sap.ui.model.Filter("Status", FilterOperator,"Closed,Ongoing,open");
                oTable.getBinding("items").filter(oFilter, FilterType.Application);
    
            }

           
            
        });
    });
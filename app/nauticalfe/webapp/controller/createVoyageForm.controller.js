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
    function (Controller, Dialog, Table, Column, ColumnListItem, Text) {
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
                console.log("clicked voyage");
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
                        // items: [
                        //     new sap.m.ColumnListItem({
                        //         cells: [
                        //             new sap.m.Text({ text: "1001" }),
                        //             new sap.m.Text({ text: "chater" }),
                        //         ],
                        //     }),

                            // Add more ColumnListItems as needed
                        // ],
                        selectionChange: function (oEvent) {
                            var oSelectedItem = oEvent.getParameter("listItem");
                            var oSelectedValue = oSelectedItem.getCells()[0].getText();
                            var inputVoyageType = this.getView().byId("_IDGenInput2"); // Input field for Voyage Type
                            this.populateInputField(inputVoyageType, oSelectedValue);
                            oDialog.close();
                        }.bind(this),
                    }),
                    beginButton: new sap.m.Button({
                        text: "Cancel",
                        type:"Reject",
                        press: function () {
                            oDialog.close();
                        },
                    }),

                });
                // var oModel = this.getView().getModel(); // Replace with your OData model reference
                var oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element

                // oValueHelpTable.setModel(oModel);

                oValueHelpTable.bindItems({
                    path: "/VOYTYP", // Replace with your entity set
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{VOYCD}" }),
                            new sap.m.Text({ text: "{VOYDES}" }),
                        ],
                    }),
                });
                // Bind the dialog to the view
                this.getView().addDependent(oDialog);

                // Open the dialog
                oDialog.open();
            },
            showValueHelpDialog2: function () {
                // Create a dialog
                console.log("clicked Biding Type");
                var oDialog = new sap.m.Dialog({
                    title: "Select: Biding Types",
                    contentWidth: "60%",
                    contentHeight: "60%",
                    content: new sap.m.Table({
                        mode: sap.m.ListMode.SingleSelectMaster,

                        columns: [
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Biding Type" }),
                            }),
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Biding Description" }),
                            }),
                        ],
                        items: [
                            new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Text({ text: "TB" }),
                                    new sap.m.Text({ text: "2 Bid System" }),
                                ],
                            }),
                            new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Text({ text: "SB" }),
                                    new sap.m.Text({ text: "1 Bid System" }),
                                ],
                            })

                            // Add more ColumnListItems as needed
                        ],
                        selectionChange: function (oEvent) {
                            var oSelectedItem = oEvent.getParameter("listItem");
                            var oSelectedValue = oSelectedItem.getCells()[0].getText();
                            var inputVoyageType = this.getView().byId("_IDGenInput3"); // Input field for Voyage Type
                            this.populateInputField(inputVoyageType, oSelectedValue);
                            oDialog.close();
                        }.bind(this),
                    }),
                    beginButton: new sap.m.Button({
                        text: "Cancel",
                        type:"Reject",
                        press: function () {
                            oDialog.close();
                        },
                    }),

                });
                // var oModel = this.getView().getModel(); // Replace with your OData model reference
                // var oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element

                // // oValueHelpTable.setModel(oModel);

                // oValueHelpTable.bindItems({
                //     path: "/VOYTYP", // Replace with your entity set
                //     template: new sap.m.ColumnListItem({
                //         cells: [
                //             new sap.m.Text({ text: "{VOYCD}" }),
                //             new sap.m.Text({ text: "{VOYDES}" }),
                //         ],
                //     }),
                // });
                // Bind the dialog to the view
                this.getView().addDependent(oDialog);

                // Open the dialog
                oDialog.open();
            },

            //                                       CARGO VALUE HELP DIALOG SECTION
            showValueHelpDialog3: function () {
                // Create a dialog
                console.log("clicked cargo");
                var oDialog = new sap.m.Dialog({
                    title: "Select: Cargo Types",
                    contentWidth: "60%",
                    contentHeight: "60%",
                    content: new sap.m.Table({
                        mode: sap.m.ListMode.SingleSelectMaster,

                        columns: [
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Cargo Type" }),
                            }),
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Description" }),
                            }),
                        ],
                        
                        selectionChange: function (oEvent) {
                            var oSelectedItem = oEvent.getParameter("listItem");
                            var oSelectedValue = oSelectedItem.getCells()[0].getText();
                            var inputVoyageType = this.getView().byId("_IDGenInput4"); // Input field for Voyage Type
                            this.populateInputField(inputVoyageType, oSelectedValue);
                            oDialog.close();
                        }.bind(this),
                    }),
                    beginButton: new sap.m.Button({
                        text: "Cancel",
                        type:"Reject",
                        press: function () {
                            oDialog.close();
                        },
                    }),

                });
                // var oModel = this.getView().getModel(); // Replace with your OData model reference
                var oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element

                // oValueHelpTable.setModel(oModel);

                oValueHelpTable.bindItems({
                    path: "/CARTYP", // Replace with your entity set
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{CARCD}" }),
                            new sap.m.Text({ text: "{CARDES}" }),
                        ],
                    }),
                });
                // Bind the dialog to the view
                this.getView().addDependent(oDialog);

                // Open the dialog
                oDialog.open();
            },
            showValueHelpDialog4: function () {
                // Create a dialog
                console.log("clicked Currency");
                var oDialog = new sap.m.Dialog({
                    title: "Select: Currency Types",
                    contentWidth: "60%",
                    contentHeight: "60%",
                    content: new sap.m.Table({
                        mode: sap.m.ListMode.SingleSelectMaster,

                        columns: [
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Currency Type" }),
                            }),
                            new sap.m.Column({
                                header: new sap.m.Text({ text: "Description" }),
                            }),
                        ],
                        
                        selectionChange: function (oEvent) {
                            var oSelectedItem = oEvent.getParameter("listItem");
                            var oSelectedValue = oSelectedItem.getCells()[0].getText();
                            var inputVoyageType = this.getView().byId("_IDGenInput5"); // Input field for Voyage Type
                            this.populateInputField(inputVoyageType, oSelectedValue);
                            oDialog.close();
                        }.bind(this),
                    }),
                    beginButton: new sap.m.Button({
                        text: "Cancel",
                        type:"Reject",
                        press: function () {
                            oDialog.close();
                        },
                    }),

                });
                // var oModel = this.getView().getModel(); // Replace with your OData model reference
                var oValueHelpTable = oDialog.getContent()[0]; // Assuming the table is the first content element

                // oValueHelpTable.setModel(oModel);

                oValueHelpTable.bindItems({
                    path: "/CURR", // Replace with your entity set
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{NAVOYCUR}" }),
                            new sap.m.Text({ text: "{NAVOYGCURDES}" }),
                        ],
                    }),
                });
                // Bind the dialog to the view
                this.getView().addDependent(oDialog);

                // Open the dialog
                oDialog.open();
            },
            onLiveChageSpeed : function(oEvent){
                

            },
            onCreateVoyage: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView3");
            },

        });
    });




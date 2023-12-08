sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/Token",
    "nauticalfe/model/formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox, MessageToast, Fragment, ColumnListItem, Label, Token, formatter) {
    "use strict";

    let pathVariable = [];
    var latLngArr = [];
    var routeArr = [];
    var map;
    var oJsonModel;
    var DataNode = {
      portData: [],
      allPort: [],
      temp: latLngArr,
      temp1: routeArr,
      oEdit: true,
    };
    var oVoyageDetailModel;

    return Controller.extend("nauticalfe.controller.View1", {
      formatter: formatter,
      onInit: function () {
        this._oRootPath = jQuery.sap.getModulePath("nauticalfe"); // your resource root

        const oPlanModel = new JSONModel([
          {
            voynm: "",
            voyty: "",
            carty: "",
            curty: "",
            bidty: "",
          },
        ]);
        // console.log(oPlanModel.getData());
        this.getView().setModel(oPlanModel, "planmodel");
        oVoyageDetailModel = new JSONModel({
          voyage: [],
        });
        this.getView().setModel(oVoyageDetailModel, "oVoyDetail");
        oJsonModel = new sap.ui.model.json.JSONModel();
        oJsonModel.setData(DataNode);
        oJsonModel.setDefaultBindingMode("TwoWay");
        this.getOwnerComponent().setModel(oJsonModel, "oJsonModel");
        var that = this;
        window.that = this;

        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRouteMatched(function (oEvent) {
          if (oEvent.getParameter("name") === "RouteView1") {
            try {
              map.invalidateSize(true);
            } catch (e) {
              // console.log(e.message);
            }
          }
        }, this);
      },

      // onBeforeRendering: function () {
      //   let that = this;
      //   setTimeout(() => map.invalidateSize(true), 50); // small delay to allow Map control to render inside splitpane
      // },

      onAfterRendering: function () {
        let that = this;
        setTimeout(() => that._renderMap(), 50);
        window.addEventListener("resize", (e) => {
          that._renderMap();
          map.invalidateSize(true);
        });
      },

      _renderMap: function () {
        map = L.map("map", {
          center: [23, 98],
          zoom: 4,
          maxZoom: 10,
          minZoom: 2,
          zoomSnap: 1,
          zoomDelta: 1,
        });
        const apiKey =
          "AAPKe27e88812313402183412454166a77bfxD0NeqearqElOoWipt7HJRkpfNICD533yGyWnO-xYLxgs9GZ-S6l5yIA9rtKDfqQ";
        const basemapEnum = "ArcGIS:Navigation";
        L.esri.Vector.vectorBasemapLayer(basemapEnum, {
          apiKey: apiKey,
        }).addTo(map);

        // show the scale bar on the lower left corner
        L.control
          .scale({
            imperial: true,
            metric: true,
          })
          .addTo(map);
        var anchorIcon = L.icon({
          iconUrl: `${this._oRootPath}/Img/Anchor.png`,
          //	shadowUrl: './Img/Anchor-shadow.png',
          iconSize: [20, 20], // size of the icon
          //	shadowSize: [41, 41], // size of the shadow
          iconAnchor: [7, 12], // point of the icon which will correspond to marker's location
          // shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        });

        var oDataModel = this.getOwnerComponent().getModel();
        var that = this;
        window.that = this;
        oDataModel.read("/es_port_master", {
          success: function (oData, oResponse) {
            // debugger;
            map.invalidateSize(true);
            oJsonModel.getData().allPort = oData.results;
            // console.log(oData.results);
            for (var i = 0; i < oData.results.length; i++) {
              L.marker([Number(oData.results[i].Latitude), Number(oData.results[i].Longitude)], {
                icon: anchorIcon,
              })
                .bindPopup(oData.results[i].Locnam)
                .bindTooltip(oData.results[i].Locnam, {
                  direction: "bottom",
                  permanent: true,
                  offset: L.point(3, 2),
                  className: "leaflet-tooltip-own",
                })
                .addTo(map)
                .on("click", that.onMarkerClick);
            }
          },
          error: function (oData, oResponse) { },
        });
      },

      groupBy: function (array, property) {
        var hash = {};
        for (var i = 0; i < array.length; i++) {
          if (!hash[array[i][property]]) hash[array[i][property]] = [];
          hash[array[i][property]].push(array[i]);
        }
        // console.log(hash);
        return hash;
      },

      onMarkerClick: function (oEvent) {
        // debugger;
        var that = this;
        sap.ui.core.BusyIndicator.show();
        if (oJsonModel.getData().portData.length) {
          if (oJsonModel.getData().portData[oJsonModel.getData().portData.length - 1].PortName === "Total") {
            oJsonModel.getData().portData.pop();
          }
        }
        oJsonModel.getData().oEdit = true;
        oJsonModel.refresh();
        var selectedPort = oJsonModel
          .getData()
          .allPort.find((element) => element.Locnam === oEvent.target._popup._source._popup._content);
        let legId = oJsonModel.getData().portData.length + 1;
        var portObj = {
          LegId: legId.toString(),
          PortId: selectedPort.PortidUan,
          PortName: selectedPort.Locnam,
          Distance: "",

          Weather: "",
          CargoSize: "",
          CargoUnit: "",
          Speed: "",
          SeaDays: "",
          PortDays: "",

          ArrivalDate: null,
          ArrivalTime: null,
          DepartureDate: null,
          DepartureTime: null,
        };
        if (!oJsonModel.getData().portData.length) {
          portObj.Distance = "00000";
        }
        oJsonModel.getData().portData.push(portObj);
        oJsonModel.refresh();
        var portLng = oJsonModel.getData().portData.length;
        if (portLng < 2) {
          var that = window.that;
          sap.ui.core.BusyIndicator.hide();
          that.byId("speedInput").setEditable(true);
          return;
        } else {
          var that = window.that;
          that.byId("createVoyageButton").setEnabled(true);
          that.byId("freighSimButton").setEnabled(true);
          that.byId("calculateVoyageButton").setEnabled(true);
          var oDataModel = that.getOwnerComponent().getModel();
          var IvToPort = oJsonModel.getData().portData[portLng - 1].PortId;
          var IvFromPort = oJsonModel.getData().portData[portLng - 2].PortId;
          var IvOptimized;
          // if (that.getView().byId("idRoutes").getState()) {
          // IvOptimized = "";
          // } else {
          IvOptimized = "X";
          // }

          var aFilter = [];
          aFilter.push(new sap.ui.model.Filter("IvFromPort", "EQ", IvFromPort));
          aFilter.push(new sap.ui.model.Filter("IvToPort", "EQ", IvToPort));
          aFilter.push(new sap.ui.model.Filter("IvOptimized", "EQ", IvOptimized));
          oDataModel.read("/es_route_map", {
            urlParameters: {
              $expand: "route",
            },
            filters: aFilter,
            success: function (oData, oResponse) {
              if (!oData.results[0].route.results.length) {
                alert("No Route");
              } else {
                for (var i = 0; i < oData.results[0].route.results.length; i++) {
                  // console.log(oData.results[0].route.results);
                  var arrNew = that.groupBy(oData.results[0].route.results, "PathId");
                }
                for (var i = 1; i < Object.keys(arrNew).length + 1; i++) {
                  var path = ["M"];
                  for (var j = 0; j < arrNew[i].length; j++) {
                    path.push([Number(arrNew[i][j].Latitude), Number(arrNew[i][j].Longitude)]);
                  }
                }
                // Added reference to each path that is drawn on the map, so it is now possible to refresh/remove it later "Khushal
                let pathVarLengthBefore = pathVariable.length;
                pathVariable.push(
                  L.curve([...path], {
                    color: "red",
                    fill: false,
                  })
                );
                for (let i = pathVarLengthBefore; i < pathVariable.length; i++) {
                  pathVariable[i].addTo(map);
                }
                oJsonModel.getData().portData[portLng - 1].Distance = oData.results[0].ZmarineApiRoute.EvDistance;
                oJsonModel.refresh();
              }
              sap.ui.core.BusyIndicator.hide();
            },
            error: function (oData, oResponse) { },
          });
        }
      },

      onClear: function (oEvent) {
        latLngArr.length = 0;
        oJsonModel.getData().portData.length = 0;
        oJsonModel.refresh();
        pathVariable.forEach((path) => path.remove());
        pathVariable = [];
        this.byId("calculateVoyageButton").setEnabled(false);
        this.byId("speedInput").setEditable(false).setValue(null);
        this.byId("daysInput").setValue(null);
      },

      onCalc: function (oEvent) {
        let selectedPorts = oJsonModel.getData().portData;
        let GvSpeed = selectedPorts[0].Speed;
        let oModel = this.getOwnerComponent().getModel("NAUTICALCV_SRV");

        let ZCalcNav = [];
        for (let i = 0; i < selectedPorts.length; i++) {
          if (!selectedPorts[i].Weather) {
            // MessageBox.error("Please enter Weather ");
            // return false;
            selectedPorts[i].Weather = "0";
          }
          if (!selectedPorts[i].CargoSize) {
            MessageBox.error("Please enter CargoSize ");
            return false;
          }
          if (!selectedPorts[i].CargoUnit) {
            MessageBox.error("Please enter Cargo Unit");
            return false;
          }
          if (!GvSpeed) {
            MessageBox.error("Please enter Speed ");
            return false;
          }
          if (!selectedPorts[i].PortDays) {
            MessageBox.error("Please enter PortDays ");
            return false;
          }
        }
        if (!selectedPorts[0].DepartureDate) {
          MessageBox.error("Please select Departure Date and Time");
          return false;
        }
        ZCalcNav.push({
          Portc: selectedPorts[0].PortId,
          Portn: selectedPorts[0].PortName,
          Pdist: selectedPorts[0].Distance,
          Medst: "NM",
          Vspeed: GvSpeed,
          Ppdays: selectedPorts[0].PortDays,
          // Vsdays: selectedPorts[0].SeaDays,
          Vetdd: selectedPorts[0].DepartureDate,
          Vetdt: formatter.timeFormat(selectedPorts[0].DepartureTime),
          Vwead: selectedPorts[0].Weather,
        });
        for (let i = 1; i < selectedPorts.length; i++) {
          ZCalcNav.push({
            Portc: selectedPorts[i].PortId,
            Portn: selectedPorts[i].PortName,
            Pdist: selectedPorts[i].Distance,
            Medst: "NM",
            Vspeed: GvSpeed,
            Ppdays: selectedPorts[i].PortDays,
            // Vsdays: selectedPorts[i].SeaDays,
            Vwead: selectedPorts[i].Weather,
          });
        }
        let oPayload = {
          GvSpeed: GvSpeed,
          ZCalcNav: ZCalcNav,
        };
        // console.log(oPayload);
        let that = this;
        oModel.create("/ZCalculateSet", oPayload, {
          success: function (oData) {
            // console.log(oData);
            let totalDays = 0;
            oData.ZCalcNav.results.forEach((data, index) => {
              selectedPorts[index].SeaDays = data.Vsdays;
              selectedPorts[index].Speed = GvSpeed;
              selectedPorts[index].Weather = data.Vwead;
              selectedPorts[index].ArrivalDate = data.Vetad;
              selectedPorts[index].ArrivalTime = new Date(formatter.timestampToUtc(data.Vetat.ms));
              selectedPorts[index].DepartureDate = data.Vetdd;
              selectedPorts[index].DepartureTime = new Date(formatter.timestampToUtc(data.Vetdt.ms));
              totalDays += Number(selectedPorts[index].SeaDays) + Number(selectedPorts[index].PortDays);
              oJsonModel.refresh();
            });
            that.byId("daysInput").setValue(totalDays.toFixed(1));
          },
          error: function (oResponse) {
            // console.log(oResponse);
          },
        });
      },

      onVoyageCreate: function (oEvent) {
        let oModel = this.getOwnerComponent().getModel("NAUTICALCV_SRV");
        let headerData = this.getView().getModel("planmodel").getData();
        let selectedPorts = oJsonModel.getData().portData;
        let GvSpeed = selectedPorts[0].Speed;
        let legOneCargoSize = selectedPorts[0].CargoSize;
        let totalCargoSize = 0;
        if (!headerData[0].voynm) {
          MessageBox.error("Please enter Voyage Name.");
          return false;
        }

        if (!headerData[0].voyty) {
          MessageBox.error("Please select Voyage Type.");
          return false;
        }

        if (!headerData[0].carty) {
          MessageBox.error("Please select Cargo Type.");
          return false;
        }

        if (!headerData[0].curty) {
          MessageBox.error("Please select Currency.");
          return false;
        }
        if (!headerData[0].bidty) {
          MessageBox.error("Please select Bidtype ");
          return false;
        }
        for (let i = 0; i < selectedPorts.length; i++) {
          if (!selectedPorts[i].Weather) {
            // MessageBox.error("Please enter Weather ");
            // return false;
            selectedPorts[i].Weather = "0";
          }
          if (!selectedPorts[i].CargoSize) {
            MessageBox.error("Please enter CargoSize ");
            return false;
          }
          if (!selectedPorts[i].CargoUnit) {
            MessageBox.error("Please enter Cargo Unit");
            return false;
          }
          if (!GvSpeed) {
            MessageBox.error("Please enter Speed ");
            return false;
          }
        }
        if (!selectedPorts[0].DepartureDate) {
          MessageBox.error("Please select Departure Date and Time");
          return false;
        }

        let ZCreatePlanNav = [];

        for (let i = 0; i < selectedPorts.length; i++) {
          ZCreatePlanNav.push({
            Vlegn: selectedPorts[i].LegId,
            Portn: selectedPorts[i].PortName,
            Portc: selectedPorts[i].PortId,
            Pdist: selectedPorts[i].Distance,
            Medst: "NM",
            Vspeed: selectedPorts[i].Speed,

            Ppdays: selectedPorts[i].PortDays,
            Vsdays: selectedPorts[i].SeaDays,
            Vetad: selectedPorts[i].ArrivalDate,
            Vetat: formatter.timeFormat(selectedPorts[i].ArrivalTime),
            Vetdd: selectedPorts[i].DepartureDate,
            Vetdt: formatter.timeFormat(selectedPorts[i].DepartureTime),
            Vwead: selectedPorts[i].Weather,
            Cargs: selectedPorts[i].CargoSize,
            Cargu: selectedPorts[i].CargoUnit,
          });
          if (i) {
            totalCargoSize += +selectedPorts[i].CargoSize;
          }
        }
        let oPayload = {
          Voynm: headerData[0].voynm,
          Voyty: headerData[0].voyty,
          Carty: headerData[0].carty,
          Curr: headerData[0].curty,
          Bidtype: headerData[0].bidty,
          ZCreatePlanNav: ZCreatePlanNav,
        };
        if (totalCargoSize > legOneCargoSize) {
          sap.m.MessageBox.error("The sum of Leg 2 (and onwards) Cargo Size must be less than Leg One Cargo Size", {
            title: "Cargo Size Exceeded",
          });
          return;
        }
        oModel.create("/ZCreatePlanSet", oPayload, {
          success: function (oData) {
            // console.log(oData);
            MessageBox.success(`Successfully created voyage - ${oData.Voyno}`, {
              title: "Voyage Created",
              onClose: function () {
                sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
                  target: {
                    semanticObject: "Z_NTCL", // #todo: change
                    action: "manage",
                  },
                  params: {
                    voyno: `${oData.Voyno}`,
                  },
                });
              },
            });
          },
          error: function (oResponse) {
            // console.log(oResponse);
          },
        });
      },

      navToFreightSim: function (oEvent) {
        // oJsonModel.refresh();
        // let legOneCargoSize = oJsonModel.getData().portData[0].CargoSize;
        // let totalCargoSize = oJsonModel.getData().portData.reduce((acc, item, index) => {
        //   return (acc = +acc + (index > 0 ? +item.CargoSize : 0));
        // }, 0);
        // if (totalCargoSize > legOneCargoSize) {
        //   sap.m.MessageBox.error("The sum of Leg 2 (and onwards) Cargo Size must be less than Leg One Cargo Size", {
        //     title: "Cargo Size Exceeded",
        //   });
        //   return;
        // }
        let oRouter = this.getOwnerComponent().getRouter();
        // oRouter.navTo("freightsim");
        oRouter.navTo("RouteView4");
      },

      // TODO
      // FIXME: Issue log 71
      onPortTabCargoSizeChange: function (oEvent) {
        let oSource = oEvent.getSource();
        let CargoSizePathInModel = oSource.getBindingContext("oJsonModel").getPath();
        let path = oSource.getBindingContext("oJsonModel").getPath();
        let value = oEvent.getParameter("value");
        oJsonModel.setProperty(path + "/CargoSize", value);
        // if (CargoSizePathInModel !== "/portData/0") {
        //   let legOneCargoSize = oEvent
        //     .getSource()
        //     .getBindingContext("oJsonModel")
        //     .getModel()
        //     .getProperty("/portData/0/CargoSize");
        //   // let inputCargoSize = oEvent
        //   //   .getSource()
        //   //   .getBindingContext("oJsonModel")
        //   //   .getModel()
        //   //   .getProperty(`${CargoSizePathInModel}/CargoSize`);
        //   let totalCargoSize = oJsonModel.getData().portData.reduce((acc, item, index) => {
        //     return (acc = +acc + (index > 0 ? +item.CargoSize : 0));
        //   }, 0);
        //   if (+totalCargoSize > +legOneCargoSize) {
        //     oSource.setValueState(sap.ui.core.ValueState.Error);
        //     oSource.setValueStateText("The sum of Leg 2 (and onwards) Cargo Size must be less than Leg One Cargo Size");
        //     this.byId("CNG").setEnabled(false);
        //     this.byId("freighSimButton").setEnabled(false);
        //     this.byId("SUB").setEnabled(false);
        //   } else {
        //     oSource.setValueState(sap.ui.core.ValueState.Success);
        //     oSource.setValueStateText(null);
        //     this.byId("CNG").setEnabled(true);
        //     this.byId("freighSimButton").setEnabled(true);
        //     this.byId("SUB").setEnabled(true);
        //   }
        // }
      },

      onSpeedInputChange: function (oEvent) {
        oJsonModel.getData().portData[0].Speed = oEvent.getParameter("value");
        oJsonModel.refresh();
        // console.log(oJsonModel.getData());
      },

      onVoyTyHelpRequest: function (oEvent) {
        let voyageModel = this.getOwnerComponent().getModel("voyagetypes");
        var aCols = {
          cols: [
            {
              label: "Voyage Type",
              template: "sVoyageType",
            },
            {
              label: "Description",
              template: "sVoyageTypeText",
            },
          ],
        };
        let oColModel = new JSONModel(aCols);
        this._oVoyTyHelpDialog = sap.ui.xmlfragment("com.ingxt.nautical.createvoyage.view.VoyageTypes", this);
        this.getView().addDependent(this._oVoyTyHelpDialog);

        this._oVoyTyHelpDialog.getTableAsync().then(
          function (oTable) {
            oTable.setModel(voyageModel);
            oTable.setModel(oColModel, "columns");

            if (oTable.bindRows) {
              oTable.bindAggregation("rows", "/sVoyageTypes");
            }

            if (oTable.bindItems) {
              oTable.bindAggregation("items", "/sVoyageTypes", function () {
                return new ColumnListItem({
                  cells: aCols.map(function (column) {
                    return new Label({
                      text: "{" + column.template + "}",
                    });
                  }),
                });
              });
            }
            this._oVoyTyHelpDialog.update();
          }.bind(this)
        );

        // this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
        this._oVoyTyHelpDialog.open();
      },

      onVoyTyHelpOkPress: function (oEvent) {
        let aTokens = oEvent.getParameter("tokens");
        // console.log(aTokens);
        this.getView().getModel("planmodel").setProperty("/0/voyty", aTokens[0].getKey());
        this._oVoyTyHelpDialog.close();
      },

      onVoyTyHelpCancelPress: function (oEvent) {
        this._oVoyTyHelpDialog.close();
      },

      onVoyTyHelpAfterClose: function (oEvent) {
        this._oVoyTyHelpDialog.destroy();
      },

      onCarTyHelpRequest: function (oEvent) {
        let cargomodel = this.getOwnerComponent().getModel("cargotypes");
        var aCols = {
          cols: [
            {
              label: "Cargo Type",
              template: "sCargoType",
            },
            {
              label: "Description",
              template: "sCargoTypeText",
            },
          ],
        };
        let oColModel = new JSONModel(aCols);
        this._oCarTyHelpDialog = sap.ui.xmlfragment("com.ingxt.nautical.createvoyage.view.CargoTypes", this);
        this.getView().addDependent(this._oCarTyHelpDialog);

        this._oCarTyHelpDialog.getTableAsync().then(
          function (oTable) {
            oTable.setModel(cargomodel);
            oTable.setModel(oColModel, "columns");

            if (oTable.bindRows) {
              oTable.bindAggregation("rows", "/sCargoTypes");
            }

            if (oTable.bindItems) {
              oTable.bindAggregation("items", "/sCargoTypes", function () {
                return new ColumnListItem({
                  cells: aCols.map(function (column) {
                    return new Label({
                      text: "{" + column.template + "}",
                    });
                  }),
                });
              });
            }
            this._oCarTyHelpDialog.update();
          }.bind(this)
        );

        // this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
        this._oCarTyHelpDialog.open();
      },

      onCarTyHelpOkPress: function (oEvent) {
        let aTokens = oEvent.getParameter("tokens");
        // console.log(aTokens);
        this.getView().getModel("planmodel").setProperty("/0/carty", aTokens[0].getKey());
        this._oCarTyHelpDialog.close();
      },

      onCarTyHelpCancelPress: function (oEvent) {
        this._oCarTyHelpDialog.close();
      },

      onCarTyHelpAfterClose: function (oEvent) {
        this._oCarTyHelpDialog.destroy();
      },

      onCargoUnitHelpRequest: function (oEvent) {
        this._oCargoInputSource = oEvent.getSource();
        let cargounitmodel = this.getOwnerComponent().getModel("cargounit");
        var aCols = {
          cols: [
            {
              label: "Cargo Unit",
              template: "sCargoUnit",
            },
            {
              label: "Description",
              template: "sCargoUnitText",
            },
          ],
        };
        let oColModel = new JSONModel(aCols);
        this._oCargoUnitHelpDialog = sap.ui.xmlfragment("com.ingxt.nautical.createvoyage.view.CargoUnit", this);
        this.getView().addDependent(this._oCargoUnitHelpDialog);

        this._oCargoUnitHelpDialog.getTableAsync().then(
          function (oTable) {
            oTable.setModel(cargounitmodel);
            oTable.setModel(oColModel, "columns");

            if (oTable.bindRows) {
              oTable.bindAggregation("rows", "/sCargoUnits");
            }

            if (oTable.bindItems) {
              oTable.bindAggregation("items", "/sCargoUnits", function () {
                return new ColumnListItem({
                  cells: aCols.map(function (column) {
                    return new Label({
                      text: "{" + column.template + "}",
                    });
                  }),
                });
              });
            }
            this._oCargoUnitHelpDialog.update();
          }.bind(this)
        );

        // this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
        this._oCargoUnitHelpDialog.open();
      },

      onCargoUnitHelpOkPress: function (oEvent) {
        let aTokens = oEvent.getParameter("tokens");
        // console.log(aTokens);
        this._oCargoInputSource.setValue(aTokens[0].getKey());
        // this.getView()
        //   .getModel("jsonmodel")
        //   .setProperty("/0/carty", aTokens[0].getKey());
        this._oCargoUnitHelpDialog.close();
      },

      onCargoUnitHelpCancelPress: function (oEvent) {
        this._oCargoUnitHelpDialog.close();
      },

      onCargoUnitHelpAfterClose: function (oEvent) {
        this._oCargoUnitHelpDialog.destroy();
        this._oCargoInputSource = undefined;
      },

      onCurTyHelpRequest: function (oEvent) {
        let currencymodel = this.getOwnerComponent().getModel("currencytypes");
        var aCols = {
          cols: [
            {
              label: "Currency Type",
              template: "sCurrencyType",
            },
            {
              label: "Description",
              template: "sCurrencyTypeText",
            },
          ],
        };
        let oColModel = new JSONModel(aCols);
        this._oCurTyHelpDialog = sap.ui.xmlfragment("com.ingxt.nautical.createvoyage.view.CurrencyTypes", this);
        this.getView().addDependent(this._oCurTyHelpDialog);

        this._oCurTyHelpDialog.getTableAsync().then(
          function (oTable) {
            oTable.setModel(currencymodel);
            oTable.setModel(oColModel, "columns");

            if (oTable.bindRows) {
              oTable.bindAggregation("rows", "/sCurrencyTypes");
            }

            if (oTable.bindItems) {
              oTable.bindAggregation("items", "/sCurrencyTypes", function () {
                return new ColumnListItem({
                  cells: aCols.map(function (column) {
                    return new Label({
                      text: "{" + column.template + "}",
                    });
                  }),
                });
              });
            }
            this._oCurTyHelpDialog.update();
          }.bind(this)
        );

        // this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
        this._oCurTyHelpDialog.open();
      },

      onCurTyHelpOkPress: function (oEvent) {
        let aTokens = oEvent.getParameter("tokens");
        // console.log(aTokens);
        this.getView().getModel("planmodel").setProperty("/0/curty", aTokens[0].getKey());
        this._oCurTyHelpDialog.close();
      },

      onCurTyHelpCancelPress: function (oEvent) {
        this._oCurTyHelpDialog.close();
      },

      onCurTyHelpAfterClose: function (oEvent) {
        this._oCurTyHelpDialog.destroy();
      },

      onBidTyHelpRequest: function (oEvent) {
        let currencymodel = this.getOwnerComponent().getModel("bidtypes");
        var aCols = {
          cols: [
            {
              label: "Bidding Type",
              template: "sBidType",
            },
            {
              label: "Description",
              template: "sBidTypeText",
            },
          ],
        };
        let oColModel = new JSONModel(aCols);
        this._oBidTyHelpDialog = sap.ui.xmlfragment("com.ingxt.nautical.createvoyage.view.BiddingTypes", this);
        this.getView().addDependent(this._oBidTyHelpDialog);

        this._oBidTyHelpDialog.getTableAsync().then(
          function (oTable) {
            oTable.setModel(currencymodel);
            oTable.setModel(oColModel, "columns");

            if (oTable.bindRows) {
              oTable.bindAggregation("rows", "/sBidTypes");
            }

            if (oTable.bindItems) {
              oTable.bindAggregation("items", "/sBidTypes", function () {
                return new ColumnListItem({
                  cells: aCols.map(function (column) {
                    return new Label({
                      text: "{" + column.template + "}",
                    });
                  }),
                });
              });
            }
            this._oBidTyHelpDialog.update();
          }.bind(this)
        );

        // this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
        this._oBidTyHelpDialog.open();
      },

      onBidTyHelpOkPress: function (oEvent) {
        let aTokens = oEvent.getParameter("tokens");
        // console.log(aTokens);
        this.getView().getModel("planmodel").setProperty("/0/bidty", aTokens[0].getKey());
        this._oBidTyHelpDialog.close();
      },

      onBidTyHelpCancelPress: function (oEvent) {
        this._oBidTyHelpDialog.close();
      },

      onBidTyHelpAfterClose: function (oEvent) {
        this._oBidTyHelpDialog.destroy();
      },
      // for currecy value help

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
                    var inputVoyageType = this.getView().byId("headerVoyty"); // Input field for Voyage Type
                    this.populateInputField(inputVoyageType, oSelectedValue);
                    oDialog.close();
                }.bind(this),
            }),
            beginButton: new sap.m.Button({
                text: "Cancel",
                type: "Reject",
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
                    var inputVoyageType = this.getView().byId("headerBidty"); // Input field for Voyage Type
                    this.populateInputField(inputVoyageType, oSelectedValue);
                    oDialog.close();
                }.bind(this),
            }),
            beginButton: new sap.m.Button({
                text: "Cancel",
                type: "Reject",
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
              var inputVoyageType = this.getView().byId("headerCarty"); // Input field for Voyage Type
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
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
              var inputVoyageType = this.getView().byId("headerCurr"); // Input field for Voyage Type
              this.populateInputField(inputVoyageType, oSelectedValue);
              oDialog.close();
            }.bind(this),
          }),
          beginButton: new sap.m.Button({
            text: "Cancel",
            type: "Reject",
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
      
    });
  }
);

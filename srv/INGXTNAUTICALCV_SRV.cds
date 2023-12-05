using INGXTNAUTICALCV_SRV from './external/INGXTNAUTICALCV_SRV.cds';

service INGXTNAUTICALCV_SRVSampleService {
    @readonly
    entity BidTypeSet as projection on INGXTNAUTICALCV_SRV.BidTypeSet
    {        Ddtext, key DomvalueL     }    
;
    @readonly
    entity CarTypeSet as projection on INGXTNAUTICALCV_SRV.CarTypeSet
    {        key Carcd, Cardes     }    
;
    @readonly
    entity CargoUnitSet as projection on INGXTNAUTICALCV_SRV.CargoUnitSet
    {        key Uom, Uomdes     }    
;
    @readonly
    entity CurTypeSet as projection on INGXTNAUTICALCV_SRV.CurTypeSet
    {        key Navoycur, Navoygcurdes     }    
;
    @readonly
    entity GtPlanSet as projection on INGXTNAUTICALCV_SRV.GtPlanSet
    {        key Voyno, Vlegn, Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    @readonly
    entity GtTabSet as projection on INGXTNAUTICALCV_SRV.GtTabSet
    {        Voyno, Vlegn, key Portc, Portn, Locnam, Pdist, Medst, Vspeed, Ppdays, Vsdays, Vetad, Vetat, Vetdd, Vetdt, Vwead, Pstat, Matnr, Maktx, Cargs, Cargu, Frcost, Othco, Totco     }    
;
    @readonly
    entity VoyTypeSet as projection on INGXTNAUTICALCV_SRV.VoyTypeSet
    {        key Voycd, Voydes     }    
;
    @readonly
    entity ZCalculateSet as projection on INGXTNAUTICALCV_SRV.ZCalculateSet
    {        key GvSpeed     }    
;
    @readonly
    entity ZCreatePlanSet as projection on INGXTNAUTICALCV_SRV.ZCreatePlanSet
    {        key Voyno, Voynm, Voyty, Carty, Curr, Bidtype     }    
;
}
using {
    Country,
    Currency,
    managed,
    cuid,
    temporal,
    sap.common.CodeList as CodeList
} from '@sap/cds/common';
//Create Voyage Database
namespace create_voyage;




// Voyage header data  Table
entity NAVOYGH {

        VOYNO      : Association to NAVOYGIP @assert.unique; // Voyage Number
        VOYNM      : String(40)@assert.unique; // Voyage Name
        VNOMTK     : String(20); // Nomination Number
        REFDOC     : String(10); //   Document Ref
        DOCIND     : Int16; // Ref Doc. ind  --> /Ingenx/REF_DOC
        VESSN      : String(20); // Vessel Name
        VIMO       : String(20);@assert.unique // Vessel IMO Number --> TWS Vehicle Master
        CHTYP      : String(5); // Charter Type
        CHPNO      : String(10); // Freight Contract -> SAP Freight Contract
        CURRKEYS   : String(5); // Currency Key
        FRTCO      : Currency; //   Freight Cost for the Voyage
        VSTAT      : String(5); // Voyage Status
        VOYTY      : String(4); // Voyage Type   -> VOYTYP
        CARTY      : String(4); // Vessel Type -> CARTYP
        CURR       : String(3); // Currency  --> NAVOYGUR
        FREGHT     : Currency; // 11   Historical Freight Cost
        PARTY      : String(10); // CHarter Party Agreement
        BIDTYPE    : String(2); // Bid type --> BIDTYPE
        FRCOST     : String(17); // Plan Freigh cost
        FRTU       : String(10); // Freight Unit
        FRCOST_ACT : Currency; // Actual Freight cost
        ZDELETE    : String(1); //  Genral flag
        REF_VOYNO  : String(20); //  REF VOYAGE No.

}

// Voyage Item level data 
entity NAVOYGIP  {

        VOYNM  : Association to  NAVOYGH ; // Voyage  Number  ->  NAVOYGH-VOYNM
        VLEGN  : Int64@assert.unique; // Numeric( 10)
        PORTC  : String(10)@assert.unique; // Internation Unified Port code - unique
        PORTN  : String(10); // commnon used port name
        LOCNAM : String(10); // ref for Oil TSW   --> OIJNOMI-LOCNAM
        PDIST  : Decimal(10, 3); // distnce betwenn two port from API
        VSPEED : Decimal(3, 3); // (The speed of the vessel from Vessel Master/Manual Input)
        PPDAYS : Decimal(3, 3); // Port days (Proposed from Historic Data/or Manual Input)
        VSDAYS : Decimal(3, 3); // Sea Dys( Proposed from Historic Data/or Manual Input)
        VETAD  : Date; // ETA
        VETAT  : Time; // Time+A14:L25
        VETDD  : Date; // Manual entry (ETD)
        VETDT  : Time; //   Time ( manual)
        VWEAD  : Decimal(3, 3); // Weather Delay Sea
        PSTAT  : String(5); // Status (In Planning, Vetting in Progress, Vetting Completed, Voyage Commenced)
        MATNR  : String(40); // Material Number
        MAKTX  : String(40); // Material Description
        CARGS  : Decimal(12); // Cargo Size
        CARGU  : String(10); // unit of measure ment
        OTHCO  : Currency; //  additional charge for voyage
        FRCOST : Currency; // total freight cost
        TOTCO  : Currency; // total cost


}
//Bid details for voyage
entity ITEM_BID  {

         VOYNO     : Association to NAVOYGH@assert.unique; // unique voyage no.
        ZCODE     : String(10); // This field is a text field allowing users to enter Data.
        VALUE     : String(50); // head data of biding details
        CVALUE    : Currency; //  Revaluation amount on back-posting to a previous period
        CUNIT     : String(5); // currency key unit   --> NAVOYGCUR
        CODE_DESC : String(50); // code description
        REV_BID   : String(1); // relevant for Biding
        GOOD      : String(1); // Good to have
        MAND      : String(1); // Active/ Inactive
        MUST      : String(1); // Must Not have
        ZMIN      : Decimal(3); // minimum score
        ZMAX      : Decimal(3); // MAximum Score

}

// Cost code Item details saved in  Table NAVOYGCIT
entity NAVOYGCIT  {
        VOYNO      : Association to NAVOYGH @assert.unique; // unique voyage no.
        VLEGN      : Int64@assert.unique; // NUMERIC(10)   Unique leg Number
        COSTCODE   : String(4)@assert.unique; //Unique cost code --> NAVOTGC
        COSTU      : String(10);
        PRCUNIT    : String(3); //
        PROCOST    : Currency; // projection Cost
        COSTCURR   : String(5); //CUKY
        CSTCODES   : String(35); // Cost code description  --> NAVOTGC
        COST_CHECK : String(1); // Relevant for biding
}
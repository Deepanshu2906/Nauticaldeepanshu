using { Country, Currency,managed, cuid, temporal, sap.common.CodeList as CodeList } from '@sap/cds/common';

using { create_voyage.NAVOYGH} from './create_voyage_schema';
namespace compare_quotation;




entity BID_SCORE  {
    CHRNMIN : String(10)@assert.unique;
    CODE : String(10); 
    CODE_DESC : String(50);
    WTAGE : Currency; // weightage(ranking);
    SCORE : Int64; // Numeric (10);
    VALUE : String(50); 
    
}


// Living biding Table 
entity VEND_FBID {

    key VOYNO :  Association to  NAVOYGH; // ref--> NAVOYGH_VOYNO
    LIFNR : String(10)@assert.unique; // Account no. of vendor or Creditor
    ZCODE : String(10);
    BIDDATE: Date;
    BIDTIME : Time;
    CHRNMIN: Association to BID_SCORE;  /// ref --> CHARTREQ
    CODE_DESC : String(50);
    VALUE : String(50);
    CVALUE : Currency;
    CUNIT : Currency; // currency key
    CHRQSDATE : Date ; // Biding Start date
    CHRQSTIME : Time ;// Biding Start time
    CHRQEDATE : Date ; // Biding end date
    CHRQETIME : Time ; // Biding end time
    DONE_BY : String(1); // vendor;
    UNAME : String(12); // created by
    STAT : String(4); // Status
    ZMODE : String(4); // AUTO/Manual;
    ZCOMM : String(250); // comments
}
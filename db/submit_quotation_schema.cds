using { Country, Currency,managed, cuid, temporal, sap.common.CodeList as CodeList } from '@sap/cds/common';

 using { create_voyage.NAVOYGH} from './create_voyage_schema';
namespace submit_quotation;


// header Table for Vendor Bid values
entity  VEND_BIDH {
        VOYNO : Association to NAVOYGH; //  unique voyage appr. no.
       LIFNR :  String(20); //  Account no. of vendor or Creditor
       CHRNMIN : String(10); // Charter No.
       VIMONO : String(10); //Vessel IMO number
       VNAME : String(40); // Vessel name
       BIDDATE :  Date; // bid date
       BIDTIME :Time ; //  Bid Time

}

//Vender Bid Values Are captured in VEND_BID
entity VEND_BID {
    VOYNO : Association to NAVOYGH ; // ref --> NAVOYGH-VOYNO
    LIFNR : String(10); // Account no. of vendor or Creditor
    ZCODE : String(10); // Code
    VALUE : String(50); // value
    CVALUE : Currency; // Revaluation amount on back-posting to a previous period
    CUNIT : Currency; // Currency key
    CHARNMIN : String(10)@assert.unique; // unique charter no. ref --> CHARTREQ
    CODE_DESC : String(50);
    BIDDATE : Date; 
    BIDTIME :Time;
    ZCOM : String(250); // comments


}

using { create_voyage.NAVOYGH } from './create_voyage_schema';

namespace create_chartering;


// Tabel for Chartening request Information
entity CHARTREQ  {
    CHRNMIN : String(10);  // Charter No.
    CHRNMEX : String(20)@assert.unique;  // Charter Ext. No
    CHRDATE : Date;         // Cretion Date
    CHRCTIME : Time;       //   Creation TIme
    CHRQSDATE : Date  ;      // Biding Start Date
    CHRQSTIME :Time;           // Biding Start Date
    CHRQEDATE : Date  ;      // Biding End Date
    CHRQETIME :Time;    // Biding End Time
    CHRQDATE : Date ; // Quote Deadline Date
    CHPREC : String(4); //   Currency (CUKY)    Field Ref --> WAERS
    CHRPORG : String(4);
    CHRPORGN : String(4)  ;   // Pur ORg. Name
    CHRPGRP : String(3);    // Pur. Group    Field Ref --> EKGRP
    CHRPGRPN: String(3);   // Charter Purchase group Name
    CHRPLANT : String(4);   // Charter Plant  field ref --> WERKS
    CHRPLANTN : String(40);  //Plant Name
    CHREXCR : Decimal(14) ; // Exch. Rate   Field Ref --> WKURS
    CHRPAYT :  String(4); // Payment Terms   Field Ref --> ZTERM
    CHRPAYTD :  String(30); // Payt. Term Des. 
    CHRINCO : String(3); // Inco Terms 
    CHRINCOL : String(70); // Inco Location
    CIMATER : String(12) ; // Material
    CIMATDES : String(40);  // Material Short Text
    CIQTY: String(17 );   // Quantity 
    CIUOM : String(3);  // Unit of Measurement
    VOYNM : Association to NAVOYGH;  //
    CHRVEN : String(10); // Vendor Code
    CHRVENN : String(35);
    CIPREC :String(5) ;     // Freight Currency   field Ref --> WAERS
    ZDELETE : String(1); // General Flag   
    REF_CHRNMI : String(10); // Ref. Chartering  No.

}

// Table for Chartering Vendor

entity ZCHAT_VEN  {
     CHRNMIN : String(10)@assert.unique;  // chartening req. no
     LIFNR : String(10); // Vendor
     VOYNO : Association to NAVOYGH;
     
}

// Table for Chartening Approval
entity CHAT_APPR {
    CREQNO : String(10)@assert.unique;  // voyage approval number
    CHRNMIN : String(10);  // Cross ref --> CHARTREQ
    ZLEVEL : String(2);  // approval level
    UNAME : String(12); // User Name
    ZDATE : Date;   // date
    ZTIME : Time; // time
    ZCOMM : String(250);  // comment
    ZACTION : String( 4);  // Action taken
    
} 
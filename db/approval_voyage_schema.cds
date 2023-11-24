using {create_voyage.NAVOYGH} from './create_voyage_schema';
namespace voyage_approval;

entity VOYAG_APPR {
    key VREQNO :String(10)@assert.unique;   // Voyage approval Request Number
    VOYNO :  Association to  NAVOYGH ; // Voyage Number
    ZLEVEL : String(2);  // Approval Level
    UNAME : String(12);
    ZDATE: Date; //    date
    ZTIME : Time;// time
    ZCOMM : String(250); // comment
    ZACTION : String(4); // Action Taken

}
using {
    Country,
    Currency
} from '@sap/cds/common';

//Voyage Master Data table
namespace NAUTI_MAS;


//voyage type table
entity VOYTYP {
    VOYCD  : String(4);    @assert.unique //Voyage code
    VOYDES : String(40); //Voyage Code Description
};

//Cargo Type Master table
entity CARTYP {

    CARCD  : String(4);    @assert.unique //Vessel Type
    CARDES : String(40); //Cargo type description
};

//Currency Master Data type table
entity CURR {

    NAVOYCUR     : String(4); //Currency Type

    NAVOYGCURDES : String(40) //Currency Description


};

//Bid Master Data table
entity MAS_BID {

    BNAME        : String(12);    @assert.unique //This field represents a unique username.

    CODE         : String(10); //This field represents a unique Code

    VALUE        : String(50); //value

    CVALUE       : Currency; //revaluation amount on back posting a previoud period

    CUNIT        : Currency; //currency key


    DATATYPE     : String(3); //data type

    TABLENAME    : String(20); //table name

    MULTI_CHOICE : String(1); //multiple choice


};

//Port Master Code table
entity ZPORT {

    ZF_VALUE : String(50); //Type of currency

    ZF_DESC  : String(50); // field description

    COUNTRY  : Country; //country

    COUNTRYN : Country; //country


};

//Unit of Measurement table
entity NAVOYGUOM {
    UOM    : String(3); //unit of measurement
    UOMDES : String(30); //UOM Description


};

//Cost Component table
entity NAVOYGC {

    COSTCODE : String(4);
    @assert.unique //cost code

    CSTCODES : String(35); //cost code description


};

//Event Master Data table
entity EVENT_MAS {

    EVTTY : String(20);    @assert.unique //Event type

    TEXT  : String(40); //Event text description


};

//Reference Document Search Help table
entity REF_DOC_S {
    DOCIND  : String(1) ;//Reference document indicator (PSX)
    DOCDESC : String(20) //Doc Desc
};
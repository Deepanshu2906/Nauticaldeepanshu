using {NAUTI_MAS } from '../db/voyage_master_data';
//Voyage Master Data service

 service master_data_yoyage_service {
 
    
 
//voyage type service
entity VOYTYP as projection on  NAUTI_MAS.VOYTYP;

//Cargo Type Master service
entity CARTYP as projection on  NAUTI_MAS.CARTYP;

//Currency Master Data type service
entity CURR as projection on  NAUTI_MAS.CURR;

//Bid Master Data service
entity MAS_BID as projection on NAUTI_MAS.MAS_BID;

//Port Master Code service
entity ZPORT as projection on  NAUTI_MAS.ZPORT;

//Unit of Measurement service
entity NAVOYGUOM as projection on  NAUTI_MAS.NAVOYGUOM;

//Cost Component service
entity NAVOYGC as projection on  NAUTI_MAS.NAVOYGC;

//Event Master Data service
entity EVENT_MAS as projection on  NAUTI_MAS.EVENT_MAS;

//Reference Document Search Help service
entity REF_DOC_S as projection on NAUTI_MAS.REF_DOC_S;
 }
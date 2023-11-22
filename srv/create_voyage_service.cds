using {transactionalData } from '../db/create_voyage_schema';

using {NAUTI_MAS } from '../db/voyage_master_data';

 service create_voyage_service {
   //voyage type service
    entity VOYTYP as projection on  NAUTI_MAS.VOYTYP;
    entity NAVOYGH as projection on transactionalData.NAVOYGH;
    entity NAVOYGIP  as projection on transactionalData.NAVOYGIP ;
    entity INGXT_ITEM_BID as projection on transactionalData.INGXT_ITEM_BID;
    entity NAVOYGCIT as projection on transactionalData.NAVOYGCIT;
 }
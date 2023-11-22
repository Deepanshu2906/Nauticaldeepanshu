using {transactionalData } from '../db/create_voyage_schema';

 service create_voyage_service {
    entity NAVOYGH as projection on transactionalData.NAVOYGH;
    entity NAVOYGIP  as projection on transactionalData.NAVOYGIP ;
    entity INGXT_ITEM_BID as projection on transactionalData.INGXT_ITEM_BID;
    entity NAVOYGCIT as projection on transactionalData.NAVOYGCIT;
 }
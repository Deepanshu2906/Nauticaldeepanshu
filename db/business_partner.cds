using {Language} from '@sap/cds/common';
//business partner master data
namespace businessPartner;
////business partner master data table
entity BP_MAS_DASH{
 
LIFNR :String(10);//Account Number of Vendor or Creditor 
PARTNER_ROLE :String(7);//BP Role for Screen Usage 
ANRED :String(15);//Title 
NAME1 :String(35);//Name 1 
NAME2 :String(35);//Name 2 
NAME3 :String(35);//Name 3
SORT1 :String(20);//Search Term 1 
STR_SUPPL1 :String(40);//Street 2 
STR_SUPPL2 :String(40);//Street 3 
HOUSE_NUM1 :String(10);//House Number 
STRAS :String(60);//Street 
PSTLZ :String(10);//Postal Code 
ORT01 :String(35);//City 
LAND1 :String(3);//Country Key 
REGIO :String(3);//Region (State, Province, County) 
TIME_ZONE :String(6);//Address time zone 
SPRAS :Language;//Language Key 
TELF1 :String(16);//First telephone number 
TELF2 :String(16);//Second telephone number 
TELFX :String(31);//Fax Number 
SMTP_ADDR :String(241);//E-Mail Address 
ERDAT :Date;//The date on which the Record Was Created 
DATE_TO :Date;//The date on which the Record Was Created 
}
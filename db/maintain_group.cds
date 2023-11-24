//Maintain Group
namespace maintain_group;
//Maintain Group table
entity ZUSER {
    
ZUSER :String(12)@assert.unique;//User Name 

ZGROUP :String(12);//User ID group 


}
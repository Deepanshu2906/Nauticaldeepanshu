const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const INGXTNAUTICALCV_SRV = await cds.connect.to("INGXTNAUTICALCV_SRV"); 
      srv.on('READ', 'BidTypeSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'CarTypeSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'CargoUnitSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'CurTypeSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'GtPlanSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'GtTabSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'VoyTypeSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'ZCalculateSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
      srv.on('READ', 'ZCreatePlanSet', req => INGXTNAUTICALCV_SRV.run(req.query)); 
}
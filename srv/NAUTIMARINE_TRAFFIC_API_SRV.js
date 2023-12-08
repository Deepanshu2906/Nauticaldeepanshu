const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const NAUTIMARINE_TRAFFIC_API_SRV = await cds.connect.to("NAUTIMARINE_TRAFFIC_API_SRV"); 
      srv.on('READ', 'EsPathCollection', req => NAUTIMARINE_TRAFFIC_API_SRV.run(req.query)); 
      srv.on('READ', 'PortMasterSet', req => NAUTIMARINE_TRAFFIC_API_SRV.run(req.query)); 
      srv.on('READ', 'es_port_master', req => NAUTIMARINE_TRAFFIC_API_SRV.run(req.query)); 
      srv.on('READ', 'es_route_map', req => NAUTIMARINE_TRAFFIC_API_SRV.run(req.query)); 
}
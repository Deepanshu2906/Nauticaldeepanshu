const cds = require('@sap/cds')

const { VOYTYP } = cds.entities("NAUTI_MAS")

const nauticalService = (srv) => {

  // try {
  //   srv.on('CREATE', 'VOYTYP', async (req, res) => {


  //     const data = req.data
      

  //     const result = await cds.tx(req).run(INSERT.into(VOYTYP).entries(data))

  //     console.log("creation >>> ",result);
  //     // res.Status(201).JSON({
  //     //   "message":"created succesfully",
  //     //   "Description": "ok"
  //     // });

  //     return result;

  //   })
  // } catch (error) {

  //   console.log("error is :" + error);

  // }

  // try {
  //   // Create an event handler for updating a Travel entity
  //   srv.on('UPDATE', 'VOYTYP', async (req) => {
  //     // Extract data from the request
  //     const { VOYCD,VOYDES } = req.data;
  //     const data = req.data;
  //     const params = req.params[0];
      
  //     console.log(data);
  //     console.log("my data ",req.data, req.params[0]);
  //     console.log( VOYDES ,data,params);

  //     // Check if the travelId is provided and is a valid format
  //     // if (!VOYCD || typeof VOYCD !== 'string') {
  //     //   throw new Error('Invalid or missing travelId');
  //     // }

  //     // Check if the updatedData is provided and is an object
  //     // if (!VOYDES || typeof VOYDES !== 'string') {
  //     //   throw new Error('Invalid or missing updatedData');
  //     // }

  //     // Use the travelId to identify the Travel entity to update
  //     const updatedVOYTYPE = await cds.tx(req).run(
  //       UPDATE(VOYTYP)
  //         .set({VOYDES:data.VOYDES})
  //         .where({ VOYCD: data.VOYCD})
  //     );

  //     // Check if any records were updated
  //     // if (updatedVOYTYPE.length === 0) {
  //     //   throw new Error(`VOYAGE TYPE with code  ${VOYCD} not found`);
  //     // }
  //     console.log( updatedVOYTYPE);
  //     return updatedVOYTYPE[0]; // Return the updated Travel entity
  //   });
  // } catch (error) {
  //   console.error('Error:', error.message);
  // }
   
//   srv.on('resolve', async (req) => {
//     const tx = cds.tx(req);
//     const res = await tx.run(
//         UPDATE('Travel')
//             .set({ 'travelStatus': 'APD' })
//             .where({ travelId: req.params[0].travelId })
//     );
//  }
// )    

  // srv.on("acceptTravel", (req) =>
  //   UPDATE(req._target).with({ travelStatus: "APD" })
  // )
  // srv.on("rejectTravel", (req) =>
  //   UPDATE(req._target).with({ travelStatus: "RJT" })
  // )

}

module.exports = nauticalService
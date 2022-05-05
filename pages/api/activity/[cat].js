import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";
import utils from "../../../server/utils";

dbManager.connect();
export default async function(req, res){
	const cat = req.query.cat;
	
	switch(req.method){
		case "GET":
			try {
				let lastComs = await dbManager.queryDB(models.Coms, {}, {"date.created": -1}, 8);
				res.status(200).json({success: true, data: lastComs});
			} catch (e){
				console.log(e);
				res.status(400).json({success: false, data: e});
			}
			break;
		default: 
			res.status(400).json({success: false});
			break;
	}
}

import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	const bid = req.query.bid;
	
	switch(req.method){
		case "GET":
			try {
				let coms = await dbManager.queryDB(models.Coms, {bid: bid}, {"date.created": -1});
				res.status(200).json({success: true, data: coms});
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
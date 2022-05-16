import dbManager from "../../../../server/db/dbmanager";
import models from "../../../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	const cat = req.query.cat;
	const bid = req.query.bid;
	
	//ignorar ruta de los assets.
	if (cat === "uploads") return res.status(400).json({success: false});
	
	switch(req.method){
		case "GET":
			try {
				let boxs = await dbManager.queryDB(models.Boxs, {bid: bid});
				let coms = await dbManager.queryDB(models.Coms, {bid: bid}, {"date.created": -1}, 10);
				let category = await dbManager.queryDB(models.Cats, {catid: cat});
				
				let data = {
					box: (boxs[0]) ? boxs[0] : {},
					category: (category[0]) ? category[0] : null,
					coms: coms
				}
				
				res.status(200).json({success: true, data: data});
			} catch (e){
				res.status(400).json({success: false, data: e});
			}
			break;
		default: 
			res.status(400).json({success: false});
			break;
	}
	
}
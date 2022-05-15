import dbManager from "../../../../server/db/dbmanager";
import models from "../../../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	const cat = req.query.cat;
	
	switch(req.method){
		case "GET":
			try {
				let filter = (cat === "home") ? {} : {cat: cat};
				const boxs = await dbManager.queryDB(models.Boxs, filter, {"date.sticky": -1, "date.bump": -1}, 41);
				res.status(200).json({success: true, data: boxs});
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
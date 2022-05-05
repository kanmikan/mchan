import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	const index = req.query.index;
	
	switch(req.method){
		case "GET":
			try {
				console.log(index);
				//const boxs = await Boxs.find({}).sort({"date.sticky": -1, "date.bump": -1}).skip(index).limit(21);
				let boxs = await dbManager.queryDBSkip(models.Boxs, {}, {"date.sticky": -1, "date.bump": -1}, index, 21);
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
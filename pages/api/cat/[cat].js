import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	let cat = req.query.cat;
	
	switch(req.method){
		case "GET":
			try {
				let filter = (cat === "home") ? {} : {cat: cat};
				let cats = await dbManager.queryDB(models.Cats, {}, {"date.sticky": -1});
				let category = (cat === "home") ? {} : cats.filter((item) => item.catid === cat)[0];
				
				res.status(200).json({success: true, data: {cats, category}});
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
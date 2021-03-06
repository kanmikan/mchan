import dbManager from "../../server/db/dbmanager";
import models from "../../server/db/dbmodels";

dbManager.connect();
export default async function(req, res){
	let cat = req.query.cat;
	console.log(cat);
	
	switch(req.method){
		case "GET":
			try {
				let filter = (cat === "home") ? {} : {cat: cat};
				
				//obtener los boxs de la categoria o la home.
				let boxs = await dbManager.queryDB(models.Boxs, filter, {"date.sticky": -1, "date.bump": -1}, 41);
				//obtener todas las categorias
				let cats = await dbManager.queryDB(models.Cats, {}, {"date.sticky": -1});
				//filtrar los datos de la categoria especifica
				let category = (cat === "home") ? {} : cats.filter((item) => item.catid === cat)[0];
				
				res.status(200).json({success: true, data: {boxs, cats, category}});
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
import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";
import jsonScheme from "../../../server/db/jsonscheme";
import utils from "../../../server/utils";

dbManager.connect();
export default async function(req, res){
	let data = req.body;
	switch(req.method){
		case "GET":
			const coms = await dbManager.queryDB(models.Coms, {});
			res.status(200).json({success: true, data: {coms}});
		break;
		case "POST":
			let comment = utils.clone(jsonScheme.COMMENT_SCHEME);
			comment.cid = utils.genCID(7);
			comment.bid = data.bid;
			comment.user.uid = "-uid-";
			comment.icon = "/assets/yuu.png";
			comment.date.created = Date.now();
			comment.content.body = data.content;
			//dbManager.pushDB(new models.Coms(comment)); //desactivo la creacion de comentarios para subirlo a vercel.
			
			res.status(200).json({success: true, data: comment});
			break;
		default: 
			res.status(400).json({success: false});
			break;
	}
}
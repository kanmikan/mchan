import dbManager from "../../../server/db/dbmanager";
import models from "../../../server/db/dbmodels";
import utils from "../../../server/utils";

dbManager.connect();
export default async function(req, res){
	const cat = req.query.cat;
	
	switch(req.method){
		case "GET":
			try {
				let filter = (cat === "home") ? {} : {cat: cat};
				let lastBoxs = await dbManager.queryDB(models.Boxs, filter, {"date.sticky": -1, "date.bump": -1}, 5);
				let cats = await dbManager.queryDB(models.Cats, {});
				
				let imgArray = [];
				
				if (!lastBoxs[0]){
					imgArray.push("/assets/placeholder.png");
				}
				
				if (cat != "home"){
					let categoryData = utils.getCategoryData(cats, cat);
					let categoryMedia = categoryData.content.media.misc;
					if (categoryMedia[0]){
						imgArray.push(categoryMedia[Math.random() * categoryMedia.length]);
					}
				} else {
					let selectedCat = cats[Math.floor(Math.random() * cats.length)];
					if (selectedCat.content.media.misc[0]){
						imgArray.push(selectedCat.content.media.misc[Math.floor(Math.random() * selectedCat.content.media.misc.length)]);
					}
				}
				
				//ultimas imagenes
				lastBoxs.forEach(function(box){
					imgArray.push((box.type.includes("video") ? box.media.preview : box.img.preview));
					if (box.content.extra.post && box.content.extra.post.images && box.content.extra.post.images.length > 0){
						let pic1 = pickRandomNoRepeat(box, imgArray);
						let pic2 = pickRandomNoRepeat(box, imgArray);
						imgArray.push(pic1);
						if (pic2 !== "none"){
							imgArray.push(pic2);
						}
					}
				});
				
				res.status(200).json({success: true, data: imgArray});
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

function pickRandomNoRepeat(box, imgList){
	let candidate = box.content.extra.post.images[Math.floor(Math.random() * box.content.extra.post.images.length)];
	if (imgList.includes(candidate)){
		return "none";
	} else {
		return candidate.split("|")[1];
	}
}
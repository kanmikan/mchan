import mongoose from "mongoose";
import {Query} from "mongoose";

var DB;

async function connect(){
	if (DB){
		console.log("[DB] Reutilizando conexion.");
		return;
	} else {
		DB = await mongoose.connect(process.env.MONGO_URI, {
			dbname: process.env.DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			ssl: process.env.SSL
		});
		console.log("[DB] Base de datos conectada.");
	}
}

function queryDB(model, find, sort={}, limit=0){
	return model.find(find).sort(sort).limit(limit);
}

function queryDBSkip(model, find, sort={}, skip=0, limit=0){
	return model.find(find).sort(sort).skip(skip).limit(limit);
}

function pushDB(model){
	return model.save();
}

module.exports = {connect, queryDB, pushDB, queryDBSkip}
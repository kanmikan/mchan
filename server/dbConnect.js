import mongoose from "mongoose";

const connection = {};

async function dbConnect(){
	if (connection.isConnected){
		return;
	} 
	//console.log(process.env.MONGO_URI);
	
	const db = await mongoose.connect(process.env.MONGO_URI, {
		dbname: process.env.DB_NAME,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		ssl: process.env.SSL
	});
	
	connection.isConnected = db.connections[0].readyState;
	console.log("[DB] Base de datos conectada.");
	
}

export default dbConnect;
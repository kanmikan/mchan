const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
	version: {
		type: Number
	},
	catid: {
		type: String,
		required: true,
		unique: true
	},
	"type": {
		type: Number
	},
	state: [],
	date: {
		created: {
			type: Number,
			required: true
		},
		order: {
			type: Number,
			required: true
		},
		sticky: {
			type: Number,
			required: true
		}
	},
	content: {
		tid: {
			type: String
		},
		name: {
			type: String
		},
		description: {
			type: String
		},
		media: {
			icon: {
				type: String
			},
			image: {
				type: String
			},
			misc: []
		},
		extra: {}
	}
	
})

module.exports = mongoose.models["cats"] || mongoose.model("cats", CatSchema);
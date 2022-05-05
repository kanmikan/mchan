const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
	version: {
		type: Number
	},
	bid: {
		type: String,
		required: true,
		unique: true
	},
	cat: {
		type: String,
		required: true
	},
	user: {
		uid: {
			type: String,
			required: true
		},
		jerarquia: {}
	},
	"type": [],
	flag: [],
	date: {
		created: {
			type: Number,
			required: true
		},
		bump: {
			type: Number,
			required: true
		},
		sticky: {
			type: Number,
			required: true
		},
		csticky: {
			type: Number,
			required: true
		}
	},
	img: {
		preview: {
			type: String
		},
		full: {
			type: String
		},
		raw: {
			type: String
		}
	},
	media: {
		preview: {
			type: String
		},
		raw: {
			type: String
		}
	},
	content: {
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		comments: {
			type: Number,
			required: true
		},
		extra: {}
	}
	
})

module.exports = mongoose.models["boxs"] || mongoose.model("boxs", BoxSchema);
const mongoose = require("mongoose");

const ComSchema = new mongoose.Schema({
	version: {
		type: Number
	},
	cid: {
		type: String,
		required: true,
		unique: true
	},
	bid: {
		type: String,
		required: true,
		unique: true
	},
	user: {
		uid: {
			type: String,
			required: true
		},
		jerarquia: {}
	},
	"type": {
		type: Array,
		required: true
	},
	flag: {
		type: Array,
		required: true
	},
	date: {
		created: {
			type: Number,
			required: true
		}
	},
	icon: {
		type: String,
		required: true
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
		body: {
			type: String,
			required: true
		},
		extra: {
			tags: {
				type: Array
			}
		}
	}
	
})

module.exports = mongoose.models["coms"] || mongoose.model("coms", ComSchema);
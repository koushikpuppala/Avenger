/** @format */

const { Schema, model } = require('mongoose')

const ContactSchema = Schema({
	UserName: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
		unique: false,
	},
	DiscordId: {
		type: String,
		required: true,
		unique: false,
	},
	Name: {
		type: String,
		required: true,
	},
	Subject: {
		type: String,
		required: true,
	},
	Message: {
		type: String,
		required: true,
	},
})

module.exports = model('Contact', ContactSchema)

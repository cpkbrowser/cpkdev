var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function() {	
	var userSchema = new Schema({
		name: String,
		username: String,
		pwd: String,
		slt: String,
		account_type: String,
		email: String,
		phone: String,
		active_date: Date,
		exp_date: Date
	});
	mongoose.model('testUser', userSchema);
};
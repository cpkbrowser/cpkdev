var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function() {	
	var userSchema = new Schema({
		name: String,
		email: String,
		username: String,
		pwd: String,
		account_type: String 
	});
	mongoose.model('testUser', userSchema);
};
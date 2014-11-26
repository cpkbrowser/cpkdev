var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function() {	
	var userProfile = new Schema({
		user_id: String,
		favorites: String,
		recently_watched: String,
		Theme: String
	});
	mongoose.model('testUserProfile', userProfile);
};
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    membership: {type: Boolean, required: true, default: false},
    admin: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('User', UserSchema);
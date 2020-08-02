var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: true},
    user: {type:Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model('Message', MessageSchema);
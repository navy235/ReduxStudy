import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: {type: Date, default: Date.now}
});
var Users = db.model('Users', UserSchema,'Users');

export default Users;
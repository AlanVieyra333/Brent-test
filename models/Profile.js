const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

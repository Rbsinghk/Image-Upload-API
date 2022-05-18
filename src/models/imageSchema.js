const mongoose = require('mongoose');

const imageModel = mongoose.Schema({
    
    image:{
        data:Buffer,
        contentType:String
    }
})
const imageSchema = new mongoose.model("imageSchema", imageModel);
module.exports = imageSchema;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    number:{
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    valor:{
        type: Number,
        require: true
    }
});

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
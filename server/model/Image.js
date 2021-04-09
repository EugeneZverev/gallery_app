const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    imageKey: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Image', imageSchema)
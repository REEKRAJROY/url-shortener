/*model to store short url information */
const mongoose = require('mongoose')
const shortId = require('shortid') /*shortid library is used to create a unique short identifier */

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate  /*everytime short id is generated it is saved here */
    },
    clicks: {
        type: Number,
        required: true,
        default: 0 /*Always the default click is starting from 0 */
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)  /*exporting the model */
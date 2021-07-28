const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express() /*variable app will contain express function which can be used to set up the entire application*/

mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser: true, useUnifiedTopology: true /*Use to remove deparcations */
})


app.set('view engine', 'ejs')  /*setting up for ejs file due to index.ejs */
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {  /*this is used to send requests and call up a file */
    const shortUrls = await ShortUrl.find() /*This is done to display the shrotened url in the table */
    res.render('index', { shortUrls: shortUrls}) /*index.ejs is rendered */
})






app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})

    res.redirect('/') /*redirecting back to home page */
})

app.get('/:shortUrl', async (req, res) => { /*Give the short link just after the first / */
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404) /*Return 404 if the website entered is invalid */

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})  

app.listen(process.env.PORT || 5000); /*app variable used to call listen function, PORT is used to set up our port but in development it is not possible so we take the default port as 5000*/
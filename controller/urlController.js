const ShortUrl = require("../database/model/shortUrl")

function urlController() {


    const handleFetchingShortUrls = async (req, res) =>{
        const shortUrls = await ShortUrl.find({});
        res.render("index", {shortUrls: shortUrls});
    }

    const handleShortenUrl = async (req, res) => {
        await ShortUrl.create({
            full: req.body.fullUrl
        })
        res.redirect("/")
    }

    return {
        handleFetchingShortUrls,
        handleShortenUrl,
    }
}

module.exports = urlController
const express = require("express")
const Config = require("./config");
const morgan = require("morgan");
const connectDB = require("./database/connection");
const urlController = require("./controller/urlController");
const ShortUrl = require("./database/model/shortUrl")

const app = express();
app.use(morgan("dev"));

//setting view engine
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//databse connection
connectDB();

const controller = urlController()
app
    .route("/")
    .get(controller.handleFetchingShortUrls)
    .post(controller.handleShortenUrl)

app.get(`/:shortUrl`, async (req, res) =>{
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl});
    if(shortUrl === null) return res.statusCode(404);

    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})

// server starting
const PORT = Config.PORT || 5000
app.listen(PORT, () => {
    console.log(`Sever start at PORT:${PORT}`);
})

module.exports = app
var express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const TextOnGif = require("text-on-gif");

var app = express();
var port = process.env.PORT || 3525;

app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", function (req, res) {
//   res.status(200).sendFile("/Users/carballo/code/add-text-to-img/index.html");
// });

app.listen(port, function () {
  console.log("========================");
  console.log("Generating Image");
  getImageJPG("El trollsejo rules")
  getImageGIF("El trollsejo rules y ahora en GIF");
});

let getImageJPG = (text) => {
  // (B) SETTINGS
  const sFile = "retard.jpg", // source image
    sSave = "retard-001.jpg", // "save as"
    sText = text, // text to write
    sX = 80,
    sY = 80; // text position

  // (C) LOAD IMAGE + DRAW TEXT
  loadImage(sFile).then((img) => {
    // (C1) CREATE CANVAS
    const canvas = createCanvas(img.width, img.height),
      ctx = canvas.getContext("2d");

    // (C2) DRAW IMAGE ONTO CANVAS
    ctx.drawImage(img, 0, 0);

    // (C3) WRITE TEXT ONTO IMAGE
    ctx.font = '55px "Impact Bold"';
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
      let td = ctx.measureText(sText),
        tw = td.width,
        th = td.actualBoundingBoxAscent + td.actualBoundingBoxDescent;

    // (C3) CALCULATE CENTER & WRITE ON CENTER
    let x = Math.floor(((img.naturalWidth - tw) / 2)),
        y = Math.floor(((img.naturalHeight - th) / 2)+220);
    ctx.strokeText(sText, x, y);
    ctx.fillText(sText, x, y);

    // (C4) SAVE
    const out = fs.createWriteStream(sSave),
      stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("Done"));
  });
};


async function getImageGIF(text) {
  //create a TextOnGif object
  var gif = new TextOnGif({
    file_path: "retard.gif",
    //path to local file, url or Buffer
  });

  //get as buffer
  var buffer = await gif.textOnGif({
    text: text,
    get_as_buffer: true,
  });

  console.log(buffer);
  gif.on("on frame", (frameIndex) => {
    gif.font_color = "white";
    // gif.font_size = "40px"
  });

  //write as file
  await gif.textOnGif({
    text: text,
    get_as_buffer: false, //set to false to save time
    write_path: "retard-002.gif",
  });
};
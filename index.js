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

app.listen(port, function () {
  console.log("========================");
  console.log("Generating JPG");
  getImageJPG("El trollsejo rules")
  console.log("Generating GIF");
  getImageGIF("El trollsejo rules en GIF");
});

let getImageJPG = (text) => {
  const sFile = "retard.jpg" // original image
  const sSave = "retard-001.jpg" // result image
  const  sText = text
  const  sX = 80
  const  sY = 80

  loadImage(sFile).then((img) => {
    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    ctx.font = '55px "Impact Bold"';
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
      let td = ctx.measureText(sText),
        tw = td.width,
        th = td.actualBoundingBoxAscent + td.actualBoundingBoxDescent;

    let x = Math.floor(((img.naturalWidth - tw) / 2)),
        y = Math.floor(((img.naturalHeight - th) / 2)+220);
    ctx.strokeText(sText, x, y);
    ctx.fillText(sText, x, y);


    const out = fs.createWriteStream(sSave),
      stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("JPG Done"));
  });
};


let getImageGIF = async function (text) {
    const gFile = "retard.gif"; // original GIF
    const gSave = "retard-001.gif"; // result GIF
    const gText = text;


  var gif = new TextOnGif({
    file_path: gFile,
  });

  var buffer = await gif.textOnGif({
    text: gText,
    get_as_buffer: true,
  });

  console.log(buffer);
  gif.on("on frame", (frameIndex) => {
    gif.font_color = "white";
  });

  await gif.textOnGif({
    text: gText,
    get_as_buffer: false,
    write_path: gSave,
  });
  console.log("GIF Done");
};
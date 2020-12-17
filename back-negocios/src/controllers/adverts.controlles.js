const Advert = require("../models/Advert");
const User = require("../models/User");

const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 },
}).single("image");

const advertsCtrl = {};

advertsCtrl.getAdverts = async (req, res) => {
  const adverts = await Advert.find();
  res.json(adverts);
};

advertsCtrl.getAdvertsByUser = async (req, res) => {
  const adverts = await Advert.find({ owner: req.params.user });
  res.json(adverts);
};

advertsCtrl.getAdvert = async (req, res) => {
  const advert = await Advert.findById(req.params.id);
  res.json(advert);
};

advertsCtrl.createAdvert = async (req, res) => {
  const {
    title,
    price,
    postalCode,
    description,
    tel,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    location,
    image,
    imgUrl,
    imgUrlIzq,
    labels,
    classification,
    businessMail,
    styles,
    backgroundColor,
    delivery,
    barrio,
    state,
    address,
    schedule,
  } = req.body;

  //descontar al credito de owner
  console.log("req files", req.file, req.files);



  /* multer */
  upload(req, res, (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    console.log(err)
    /*Now do where ever you want to do*/
    //if (!err) return res.send(200).end();
  });
  

  const user = await User.findById(req.token.id, { credit: 1 });
  console.log("image", image);
  await User.findByIdAndUpdate(req.token.id, { $inc: { credit: -price } });
  const result = await cloudinary.v2.uploader.upload(
    image.src,
    function (error, result) {
      console.log(result, error);
    }
  );

  console.log("res", result);

  // si todo ok, resta credito
  if (price > user.credit)
    return res.json({ ok: false, message: "saldo insuficiente" });
  //creando el anuncio
  const newAdvert = new Advert({
    owner: req.token.id,
    barrio,
    title,
    postalCode,
    description,
    tel,
    image: {
      url: result.url,
      src: result.public_id,
    },
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    businessMail,
    location,
    postalCode,
    imgUrl,
    imgUrlIzq,
    labels,
    styles,
    classification,
    backgroundColor,
    delivery,
  });
  await newAdvert.save();
  await fs.unlink(req.file.path); // elimina fichero creado para imagen
  res.json({ ok: true, message: "Anuncio creado con éxito", newAdvert });
};

advertsCtrl.deleteAdvert = async (req, res) => {
  //TODO falta eliminar la imagen de cludinary
  /* ejemplo traido desde https://github.com/raulzarzadev/express-multer/blob/master/src/routes/index.js  
  const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id); */
  await advert.findByIdAndRemove(req.params.id);
  res.json({ message: "Anuncio eliminada" });
};

advertsCtrl.updateAdvert = async (req, res) => {
  const {
    title,
    description,
    tel,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    location,
  } = req.body;
  await advert.findByIdAndUpdate(req.params.id, {
    title,
    description,
    tel,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    location,
  });
  res.json({ message: "Actualizando Anuncio" });
};

module.exports = advertsCtrl;

const Advert = require("../models/Advert");
const User = require("../models/User");

const advertsCtrl = {};

advertsCtrl.getAdverts = async (req, res) => {
  const adverts = await Advert.find();
  res.json({ ok: true, adverts });
};

advertsCtrl.getAdvertsByUser = async (req, res) => {
  const adverts = await Advert.find({ owner: req.params.user });
  res.json({ ok: true, adverts });
};

advertsCtrl.getAdvert = async (req, res) => {
  const advert = await Advert.findById(req.params.id);
  res.json({ ok: true, advert });
};

advertsCtrl.createAdvert = async (req, res) => {
  const {
    title,
    contacts,
    price,
    postalCode,
    description,
    tel,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    location,
    labels,
    image,
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

  /* TODO ahora no se restan form credit  cuando creas un adert */
  /* 
  const user = await User.findById(req.token.id, { credit: 1 });
  await User.findByIdAndUpdate(req.token.id, { $inc: { credit: - price } });

  // si todo ok, resta credito
  if (price > user.credit)
    return res.json({ ok: false, message: "saldo insuficiente" }); */
  //creando el anuncio
  const newAdvert = new Advert({
    owner: req.token.id,
    contacts,
    barrio,
    title,
    postalCode,
    description,
    tel,
    image,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    businessMail,
    location,
    postalCode,
    labels,
    styles,
    classification,
    backgroundColor,
    delivery,
    address,
  });
  await newAdvert.save();
  res.json({ ok: true, message: "Anuncio creado con éxito", newAdvert });
};

advertsCtrl.deleteAdvert = async (req, res) => {
  //TODO falta eliminar la imagen de cludinary
  /* ejemplo traido desde https://github.com/raulzarzadev/express-multer/blob/master/src/routes/index.js  
  const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id); */
  await Advert.findByIdAndRemove(req.params.id);
  res.json({ message: "Advert deleted", ok: true });
};

advertsCtrl.updateAdvert = async (req, res) => {
  const {
    title,
    contacts,
    postalCode,
    description,
    tel,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    location,
    labels,
    image,
    classification,
    businessMail,
    styles,
    backgroundColor,
    delivery,
    barrio,
    address,
  } = req.body.data;
  
  await Advert.findByIdAndUpdate(req.params.id, {
    contacts,
    barrio,
    title,
    postalCode,
    description,
    tel,
    image,
    whatsApp,
    faceUrl,
    instaUrl,
    siteUrl,
    businessMail,
    location,
    postalCode,
    labels,
    styles,
    classification,
    backgroundColor,
    delivery,
    address,
  });
  res.json({ ok: true, message: "Actualizando Anuncio" });
};

module.exports = advertsCtrl;

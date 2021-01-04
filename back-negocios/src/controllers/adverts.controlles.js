const Advert = require("../models/Advert");

const advertsCtrl = {};

advertsCtrl.getPublishedAdverts = async (req, res) => {
  const adverts = await Advert.find({ isPublished: true }, { publishedOn: 1 });
  res.json({ ok: true, adverts });
};

advertsCtrl.getManagerAdverts = async (req, res) => {
  const adverts = await Advert.find();
  res.json({ ok: true, adverts });
};

advertsCtrl.getAdvertsByOwner = async (req, res) => {
  const { id } = req.params;
  const adverts = await Advert.find({ owner: id });
  res.json({ ok: true, adverts });
};

advertsCtrl.getAdvert = async (req, res) => {
  const advert = await Advert.findById(req.params.id);
  //console.log('getadvert', req.user)
  res.json({ ok: true, advert });
};

advertsCtrl.createAdvert = async (req, res) => {
  //console.log("creating advert", req.body.advert);
  //console.log(req.user)
  //console.log(req.token)

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
    isPublished,
    publishedOn,
    price,
    state,
    schedule,
  } = req.body.advert;

  /* TODO ahora no se restan form credit  cuando creas un adert */
  /* 
  const user = await User.findById(req.token.id, { credit: 1 });
  await User.findByIdAndUpdate(req.token.id, { $inc: { credit: - price } });

  // si todo ok, resta credito
  if (price > user.credit)
    return res.json({ ok: false, message: "saldo insuficiente" }); */
  //creando el anuncio

  const newAdvert = new Advert({
    owner: req.user.id,
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
    isPublished,
    publishedOn,
  });
  await newAdvert.save();
  res.json({ ok: true, message: "Anuncio creado con éxito", newAdvert });
};

advertsCtrl.updateAdvert = async (req, res) => {
  const {
    title,
    contacts,
    postalCode,
    description,
    location,
    labels,
    image,
    classification,
    backgroundColor,
    barrio,
    address,
    isPublished,
    publishedOn,
  } = req.body.advert;

  await Advert.findByIdAndUpdate(req.params.id, {
    title,
    description,
    contacts,
    labels,
    image,
    classification,
    backgroundColor,
    address,
    isPublished,
    publishedOn,
    barrio,
    postalCode,
    location,
    postalCode,
  });

  res.json({ ok: true, message: "Actualizando Anuncio" });
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

module.exports = advertsCtrl;

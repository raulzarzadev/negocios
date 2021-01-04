const Barrio = require("../models/Barrio");
const Advert = require("../models/Advert");

const barriosCtrl = {};


barriosCtrl.getBarrios = async (req, res) => {
  const barrios = await Barrio.find();
  res.json({ barrios, ok: true, type: "getBarrios" });
};

barriosCtrl.getBarrio = async (req, res) => {
  const barrio = await Barrio.findById(req.params.id, { name: 1 });
  const adverts = await Advert.find({ barrio: req.params.id });
  res.json({ barrio, adverts });
};

barriosCtrl.getAdvertsByBarrioShortName = async (req, res) => {
  const barrio = await Barrio.findOne({
    shortName: req.params.shortName,
  });

  if (!barrio)
    return res.json({
      ok: false,
      message: "Este barrrio no existe",
      type: "noExist",
    });

  //const id = "5fea9b9c6f61cb00ef8b553a";
  const id = barrio._id.toString();

  const adverts = await Advert.find({
    publishedOn: {
      $all: [id],
    },
    isPublished: true,
  });
  res.json({ ok: true, barrio, adverts });
};

barriosCtrl.createBarrio = async (req, res) => {
  const { name, price, state, shortName, stateData } = req.body;

  const newBarrio = new Barrio({
    owner: req.token.id,
    shortName,
    name,
    price,
    state,
    stateData,
  });

  await newBarrio.save();
  res.json({ ok: true, message: "Nuevo barrio creado.", newBarrio });
};

barriosCtrl.deleteBarrio = async (req, res) => {
  await Barrio.findByIdAndRemove(req.params.id);
  res.json({ message: "Anuncio eliminada" });
};

barriosCtrl.updateBarrio = async (req, res) => {
  const { name, price, owner } = req.body;

  await Barrio.findByIdAndUpdate(req.params.id, {
    name,
    price,
    owner,
  });
  res.json({ message: "Actualizando Anuncio" });
};

module.exports = barriosCtrl;

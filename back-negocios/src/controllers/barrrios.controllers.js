const Barrio = require('../models/Barrio')
const Advert = require('../models/Advert')
const User = require('../models/User')

const barriosCtrl = {};


barriosCtrl.getBarrios = async (req, res) => {
    const barrios = await Barrio.find()
    console.log(barrios)
    res.json({ barrios, ok: true, type: "getBarrios" })

};

barriosCtrl.getBarrio = async (req, res) => {
    const barrio = await Barrio.findById(req.params.id, { name: 1 })
    const adverts = await Advert.find({ barrio: req.params.id })
    res.json({ barrio, adverts })
};

barriosCtrl.getAdvertsByBarrioShortName = async (req, res) => {
    const barrio = await Barrio.findOne(
        {
            'shortName': req.params.shortName
        })
    const adverts = await Advert.find({ 'barrio.shortName': req.params.shortName })
    res.json({ barrio, adverts })

}

barriosCtrl.createBarrio = async (req, res) => {
    const { name, price, state, shortName } = req.body
    //descontar credito a owner

    const user = await User.findById(req.token.id, { credit: 1 })
    if (price) {
        if (price > user.credit) return res.json({ ok: false, message: 'saldo insuficiente' })
        await User.findByIdAndUpdate(req.token.id, { $inc: { credit: - price } })
    }

    // crear barrio
    const newBarrio = new Barrio({
        owner: req.token.id,
        shortName,
        name,
        price,
        state
    });

    await newBarrio.save()
    res.json({ ok: true, message: 'Nuevo barrio creado.', newBarrio })
};

barriosCtrl.deleteBarrio = async (req, res) => {
    await Barrio.findByIdAndRemove(req.params.id)
    res.json({ message: 'Anuncio eliminada' })
};

barriosCtrl.updateBarrio = async (req, res) => {
    const {
        name,
        price,
        owner
    } = req.body

    await Barrio.findByIdAndUpdate(req.params.id, {
        name,
        price,
        owner
    })
    res.json({ message: 'Actualizando Anuncio' })
};

module.exports = barriosCtrl
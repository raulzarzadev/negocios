const { Router } = require('express')
const router = Router();
const isAuthenticated = require('../authenticatons/jwt.authentication')

const {
    getBarrios,
    createBarrio,
    deleteBarrio,
    getBarrio,
    updateBarrio,
    getAdvertsByBarrioShortName
} = require('../controllers/barrrios.controllers')


router.route('/')
    .get(getBarrios)
    .post(isAuthenticated,createBarrio)

router.route('/:shortName')
    .get(getAdvertsByBarrioShortName)
    .delete(isAuthenticated, deleteBarrio)
    .put(isAuthenticated, updateBarrio)


module.exports = router;
const { Router } = require('express')
const router = Router();
const isAuthenticated = require('../authenticatons/jwt.authentication')

const {
    getAdverts,
    createAdvert,
    deleteAdvert,
    getAdvert,
    updateAdvert,
    getAdvertsByUser
} = require('../controllers/adverts.controlles')


router.route('/')
    .get(getAdverts)
    .post(isAuthenticated,createAdvert)

router.route('/:id')
    .get(getAdvertsByUser)
    .delete(isAuthenticated, deleteAdvert)
    .put(isAuthenticated, updateAdvert)


module.exports = router;
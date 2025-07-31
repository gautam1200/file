var express = require('express')
var router = express.Router()



let AC = require('../controller/red')

router.get('/', AC.viewsPage)
router.get('/createData' , AC.Datashow)
router.get('/:id' , AC.Datadelete)
router.get('/:id' , AC.UpdateData)

module.exports = router

import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource')
// })


 // GET
router.get("/", flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.get('/:id/edit', flightsCtrl.edit)

// POST
router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.post('/:id/destinations', flightsCtrl.addToDestinations)

// DELETE
router.delete('/:id', flightsCtrl.delete)

// PUT
router.put('/:id', flightsCtrl.update)

export {
  router
}

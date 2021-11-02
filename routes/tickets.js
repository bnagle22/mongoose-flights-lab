import {Router} from "express"
import * as ticketsCtrl from "../controllers/tickets.js"

const router = Router()

router.get("/new", ticketsCtrl.new)

router.post("/", ticketsCtrl.create)

export {
  router
}
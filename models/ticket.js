import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, required: true, unique: true} 
}, {
  price: {type: Number, required: true, unique: true}
})

const Ticket = mongoose.model("Ticket:, ticketSchema")

export {
  Ticket
}
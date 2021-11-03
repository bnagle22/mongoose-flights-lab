import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: Number
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true
  },
  airport: {
    type: String,
    required: true
  },
  flightNo: {
    type: Number,
    min: 0,
    max: 999,
    required: true
  },
  departs: {
    type: Date,
    required: true
  },
  tickets: [ticketSchema],
  destinations: [{type: Schema.Types.ObjectId, ref: "Destination"}]
}
)

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}
import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight"
  })
}

function create(req, res) {
  const flight = new Flight(req.body)
  console.log(req.body)
  console.log(flight)
  flight.save(function(err) {
    if (err) {
      return res.redirect('/flights/new')
    }
    res.redirect(`/flights/${flight._id}`)
  })
}

function index(req, res) {
  Flight.find({}, function(error, flights) {
    console.log("list of flights", flights)
    res.render("flights/index", {
      flights,
      error,
      title: "All Flights"
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate("destinations")
  .exec(function(err, flight){
    Destination.find({_id: {$nin: flight.destinations}}, function(err, destinations){
      console.log(destinations)
      res.render("flights/show", {
        title: ` Flight ${flight.flightNo} Details`,
      flight,
      destinations
      })
    })
  })
  // Flight.findById(req.params.id, function(err, flight) {
  //   res.render("flights/show", {
  //     title: ` Flight ${flight.flightNo} Details`,
  //     flight,
  //     Destination
  //   })
  // })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect("/flights")
  })
}

function edit(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    res.render("flights/edit", {
      title: "Edit flight",
      flight
    })
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
    res.redirect(`flights/${flight._id}`)
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}/`)
    })
  })
}

function addToDestinations(req, res) {
  console.log(req.body)
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToDestinations
}
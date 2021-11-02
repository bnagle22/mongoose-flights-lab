import { Flight } from "../models/flight.js"

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
  Flight.findById(req.params.id, function(err, flight) {
    res.render("flights/show", {
      title: ` Flight ${flight.flightNo} Details`,
      flight
    })
  })
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

function addToTickets(req, res) {
  Flight.findById(req.body.id, function(err, flight) {
    flight.tickets.push(req.body.ticketId)
    ticket.save(function(err){
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
  addToTickets
}
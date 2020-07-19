const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 4001
const routes = require('./routes')

const app = express()
app.use(routes)

const server = http.createServer(app)
const io = socketIo(server)

let interval
io.on('connection', socket => {
  console.log('New client connected')
  if (interval) {
    clearInterval()
  }
  interval = setInterval(() => getApiAndEmit(socket), 10)
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearInterval(interval)
  })
})

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response)
}

server.listen(port, () => console.log(`Listening on port ${port}`))

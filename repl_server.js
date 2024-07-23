const net = require('net')
const WebSocket = require('ws')

// Store the WebSocket client
let wsClient = null

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 1338 })

wss.on('connection', ws => {
  console.log('WebSocket Client connected')
  wsClient = ws

  ws.on('close', () => {
    console.log('WebSocket Client disconnected')
    wsClient = null
  })

  ws.on('error', err => {
    console.error('WebSocket error:', err)
  })
})

console.log('WebSocket server listening on port 1338')

// Store the current TCP client
let tcpClient = null

// Create the TCP server
const server = net.createServer(socket => {
  console.log('TCP Client connected')
  tcpClient = socket

  tcpClient.write('> ')

  // Set encoding for the socket
  socket.setEncoding('utf8')

  // Event handler for incoming data from TCP client
  socket.on('data', data => {
    console.log('Received from TCP client:', data.trim())

    // Forward the data to the WebSocket client for evaluation
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
      wsClient.send(data.trim())
    } else {
      console.error('WebSocket client is not open')
      tcpClient.write('Error: WebSocket client is not open\n' + '> ')
    }
  })

  // Event handler for client disconnection
  socket.on('end', () => {
    console.log('TCP Client disconnected')
    tcpClient = null
  })

  // Event handler for socket errors
  socket.on('error', err => {
    console.error('TCP Socket error:', err)
  })
})

// Start the TCP server on port 1337
server.listen(1337, () => {
  console.log('TCP server listening on port 1337')
})

// Event handler for incoming messages from WebSocket client
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received from WebSocket client:', message)

    // Send the result back to the TCP client
    if (tcpClient) {
      tcpClient.write(message + '\n' + '> ')
    } else {
      console.error('No TCP client connected')
    }
  })
})

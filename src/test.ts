import { io } from "socket.io-client"

const socket = io("ws://localhost:8080", {
    transports: [
        'websocket',
        'polling',
        'flashsocket'
    ]
})

socket.on("auth", (payload: { message: string, authkey: string }) => {
    console.log(payload)
})

socket.on("error", (payload: { message: string }) => {
    console.log(payload)
})

socket.emit("auth", {
    authkey: "C6CB538265B3AFE350640DC98C61DB7223E14145F4E895C8E93958F53B3B8A27"
})

socket.emit("loc-status", {
    "latitude": 16.497031082533837,
    "longitude": 80.62979478539985,
    "current_speed": 50
})
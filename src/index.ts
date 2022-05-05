const { validateSchema } = require('./misc/validations')
import { Server } from "socket.io"
const Joi = require('joi')

const sio = new Server(8080)
const authkey = "C6CB538265B3AFE350640DC98C61DB7223E14145F4E895C8E93958F53B3B8A27"

sio.on("connection", socket => {

    socket.on("auth", (payload: { authkey: string }) => {

        const { success, message } = validateSchema(
            Joi.object({ authkey: Joi.string().required() }),
            payload
        )

        if (!success) {
            return sendError(socket, message)
        }

        if (payload.authkey != authkey) {
            return sendError(socket, `"authkey" is invalid`)
        }

        socket.join(payload.authkey)
        socket.emit("auth", {
            message: "Authentication successful",
            ...payload
        })

    })

})

function sendError(socket: any, message: any) {

    socket.emit("error", {
        message: message
    })

}
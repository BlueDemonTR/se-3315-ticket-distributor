import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seat: {
        type: Schema.Types.ObjectId,
        ref: 'Seat'
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

const Ticket = model('Ticket', TicketSchema)

export default Ticket
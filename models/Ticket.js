import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seat: {
        type: Schema.Types.ObjectId,
        ref: 'Seat'
    }
})

const Ticket = model('Ticket', TicketSchema)

export default Ticket
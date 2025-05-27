import { Schema, model } from 'mongoose'

const SeatSchema = new Schema({
    train: {
        type: Schema.Types.ObjectId,
        ref: 'Train'
    },
    number: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

const Seat = model('Seat', SeatSchema)

export default Seat
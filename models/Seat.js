import { Schema, model } from 'mongoose'

const SeatSchema = new Schema({
    train: {
        type: Schema.Types.ObjectId,
        ref: 'Train'
    },
    number: {
        type: Schema.Types.ObjectId,
        ref: 'String'
    }
})

const Seat = model('Seat', SeatSchema)

export default Seat
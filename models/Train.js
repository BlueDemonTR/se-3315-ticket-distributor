import { Schema, model } from 'mongoose'

const TrainSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    },
    departure: Date,
    ticketPrice: Number
})

const Train = model('Train', TrainSchema)

export default Train
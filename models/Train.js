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
    duration: {
        type: Number,
        min: 0
    },
    ticketPrice: {
        type: Number,
        min: 0
    },
    deleted: Boolean
})

const Train = model('Train', TrainSchema)

export default Train
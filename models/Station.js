import { Schema, model } from 'mongoose'

const StationSchema = new Schema({
    name: String
})

const Station = model('Station', StationSchema)

export default Station
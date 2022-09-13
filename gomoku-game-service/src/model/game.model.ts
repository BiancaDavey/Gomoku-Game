import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    size: number,
    // TODO  [number]
    moves: [number],
    date: string,
    result: string
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    size: Number,
    // TODO [Number]
    moves: [Number],
    date: String,
    result: String
})

export default mongoose.model<GameDocument>("Game", gameSchema)
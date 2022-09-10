import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model';

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    status: string,
    date: string,
    board: number,
    stones: [number]
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    status: String,
    date: String,
    board: Number,
    stones: [Number]
})

export default mongoose.model<GameDocument>("Game", gameSchema)
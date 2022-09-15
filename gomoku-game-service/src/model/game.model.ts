import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model'
import type { Position } from '../../../gomoku-game-react/src/types'  // 15/09

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    size: number,
    moves: number[][]  // TODO 15/09.
    //moves: [number],  // Original.
    date: string,
    result: string
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    size: Number,
    moves: [[Number]],
    date: String,
    result: String
})

export default mongoose.model<GameDocument>("Game", gameSchema)
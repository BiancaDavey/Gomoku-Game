import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model';

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    status: string,
    date: string,
    board: string
}

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},  // Added 19:30, attempting WK8_4-5.
    status: String,
    date: String,
    board: String
})

export default mongoose.model<GameDocument>("Game", gameSchema)
import mongoose, { Document } from "mongoose"
import { UserDocument } from './user.model';

export interface GameDocument extends Document {
    userId: UserDocument["_id"];
    status: string,
    date: string,
    board: string
}

const gameSchema = new mongoose.Schema({
    status: string,
    date: string,
    board: string
})

export default mongoose.model<GameDocument>("Game", gameSchema)
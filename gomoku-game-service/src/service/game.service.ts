import mongoose, { DocumentDefinition } from 'mongoose';
import GameModel from '../model/game.model';

//  Function to return all games.
export async function getAllGames() {
    return await GameModel.find().lean();
}

//  Function to return game by Id.
export async function getGameById(id: string){
    return await GameModel.findById(id).lean();
}

//  Function to return games by userId.
export async function getGamesByUserId(userId: string){
    return await GameModel.find({userId}).lean();
}

//  Function to create a new game.
export async function createGame(input: DocumentDefinition<GameDocument>){
    return GameModel.create(input);
}

//  Function to update a game.
export async function updateGame(id: string, userId: string, input: DocumentDefinition<GameDocument>){  // 10/09 added userId.
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId) // 10/09 added.
        },
        input,
        { new: true }
    )
}

//  Function to delete a game.
export async function deleteGame(id: string, userId: string){  // 10/09 added userId
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
    })
}
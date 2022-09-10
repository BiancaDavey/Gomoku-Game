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
export async function updateGame(id: string, input: DocumentDefinition<GameDocument>){
    return GameModel.findOneAndUpdate(
        {_id: new mongoose.Types.ObjectId(id)},
        input,
        {new: true}
    )
}

//  Function to delete a game.
export async function deleteBooking(id: string){
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id)
    })
}
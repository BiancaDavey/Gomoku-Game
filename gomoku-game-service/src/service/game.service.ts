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

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import validateSchema from '../middleware/validateSchema';
import { getGameByIdSchema, createGameSchema, updateGameSchema, deleteGameSchema } from '../schema/game.schema';
import { getAllGames, getGameById, getGamesByUserId, createGame, updateGame, deleteGame } from '../service/game.service';

const gameHandler = express.Router();
 
/*
const GAMES = [
    {
        "gameId": "1",
        "status": "Game Status 1",
        "date": "Date 1",
        "board": 1,
        "stones": [1,3]
    },
    {
        "gameId": "2",
        "status": "Game Status 2",
        "date": "Date 2",
        "board": 9,
        "stones": [1,5]
    }
]
*/


//  OLD GET all games.
/* 
gameHandler.get("/", (req: Request, res: Response) => {
   res.status(200).json(GAMES);
})
*/

// NEW WK8-4.5 Get all games.
////gameHandler.get("/", async (req: Request, res: Response) => {
    /*
    try {
        const result = await getAllGames();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).send(err);
    }
    */
    
   ////const result = await getAllGames();
   ////if (!result) return res.sendStatus(404);
   ////return res.status(200).json({ ...GAMES });  // 20:00 WK8.4-5. This returns 0 {GAMES 1}, 1 {GAMES 2}.
   ////// return res.status(200).json({...result});  // 2:00 WK8.4-5. This returns {} empty.
    
////})


//  OLD GET game by gameId.
gameHandler.get("/:gameId", validateSchema(getGameByIdSchema), (req: Request, res: Response) => {
    const result = GAMES.find((g) => (g.gameId === req.params.gameId));
    if (result) {
        return res.status(200).json(result);
    }
    res.sendStatus(404);
})

// NEW WK8-4.5 Get game by Id. // doesn't work yet.
gameHandler.get("/:id", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    const gameId = req.params.id;  // formerly, just gameId in the get.
    const userId = "62f88bd5e67347af189c4baa";
    const game = await getGameById(gameId);
    if (!game) return res.sendStatus(404);
    return res.status(200).json({ ...game });
})



// 22:00  // NEW WK8.4-5 Get games by userId.  
gameHandler.get("/", async (req: Request, res: Response) => {  // TODO: or "/:userId"?
    const userId = "62f88bd5e67347af189c4baa";
    const games = await getGamesByUserId(userId);
    if (!games) return res.sendStatus(404);
    return res.status(200).json(games);
})




//  Create a game.
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    const userId = "62f88bd5e67347af189c4baa";
    const game = req.body;
    const newGame = await createGame({ ...game, userId });
    return res.status(200).send(newGame);
})

//  Update a game.
gameHandler.put("/:id", validateSchema(updateGameSchema), async (req: Request, res: Response) => {
    const userId = "62f88bd5e67347af189c4baa"; 
    const game = req.body;
    const gameId = req.params.id;
    const newGame = await updateGame(gameId, { ...game, userId });
    if (!newGame) return res.sendStatus(400);
    return res.status(200).json(newGame);
})

//  Delete a game.
gameHandler.delete("/:id", validateSchema(deleteGameSchema), async (req: Request, res: Response) => {
    const gameId = req.params.id;
    await deleteGame(gameId);
    res.sendStatus(200);
})

export default gameHandler;
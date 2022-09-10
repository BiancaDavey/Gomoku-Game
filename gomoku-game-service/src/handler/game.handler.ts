import express, { Request, Response } from "express";
import mongoose from "mongoose";
import validateSchema from '../middleware/validateSchema';
import { getGameByIdSchema, createGameSchema, updateGameSchema, deleteGameSchema } from '../schema/game.schema';

const gameHandler = express.Router();
 
const GAMES = [
    {
        "gameId": "1",
        "status": "Game Status 1",
        "date": "Date 1",
        "board": "Board Size 1"
    },
    {
        "gameId": "2",
        "status": "Game Status 2",
        "date": "Date 2",
        "board": "Board Size 2"
    }
]

//  GET all games. 
gameHandler.get("/", (req: Request, res: Response) => {
   res.status(200).json(GAMES);
})
 
//  GET game by gameId.
gameHandler.get("/:gameId", validateSchema(getGameByIdSchema), (req: Request, res: Response) => {
    const result = GAMES.find((g) => (g.gameId === req.params.gameId));
    if (result) {
        return res.status(200).json(result);
    }
    res.sendStatus(404);
})

//  Current for WK8_03.
//  POST Create a new game.
gameHandler.post("/", validateSchema(createGameSchema), (req: Request, res: Response) => {
   console.log("Create new game.");
   //  Save into storage.
   const game = req.body;
   res.status(200).json(game)
})
 
//  PUT Modify a game.
gameHandler.put("/:gameId", validateSchema(updateGameSchema), (req: Request, res: Response) => {
   console.log("Modify game.");
   //  Update in storage.
   const game = req.body;
   res.status(200).json(game);
})
 
//  DELETE Delete a game.
gameHandler.delete("/:gameId", validateSchema(deleteGameSchema), (req: Request, res: Response) => {
   console.log("Delete game.");
   //  Delete in storage.
   res.sendStatus(200);
})

export default gameHandler;
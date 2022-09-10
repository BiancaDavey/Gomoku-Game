import express, { Request, Response } from "express";
import mongoose from "mongoose";
import validateSchema from '../middleware/validateSchema';
import { getGameByIdSchema, createGameSchema, updateGameSchema, deleteGameSchema } from '../schema/game.schema';
import { getAllGames, getGameById, getGamesByUserId, createGame, updateGame, deleteGame } from '../service/game.service';

const gameHandler = express.Router();
 
//  Get games. 
gameHandler.get("/", async (req: Request, res: Response) => {
    const userId = "62f88bd5e67347af189c4baa";
    const games = await getGamesByUserId(userId);
    if (!games) return res.sendStatus(404);
    return res.status(200).json(games);
})

//  Get game by id.
gameHandler.get("/:id", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    const gameId = req.params.id;  // formerly, just gameId in the get.
    const userId = "62f88bd5e67347af189c4baa";
    const game = await getGameById(gameId);
    if (!game) return res.sendStatus(404);
    return res.status(200).json({ ...game });
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
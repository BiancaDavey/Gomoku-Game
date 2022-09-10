import { string, object, TypeOf } from "zod";

const payload = {
    body: object({
      gameId: string({
        required_error: "Game Id is required",
      }),
      status: string({
        required_error: "Status is required",
      }),
      date: string({
        required_error: "Date is required",
      }),
      board: string({
        required_error: "Board is required",
      })
    })
  }

const getParams = {
  params: object({
    gameId: string({
      required_error: "Game Id is required.",
    }),
  }),
};

const updateDeleteParams = {
    params: object({
      gameId: string({
        required_error: "Game Id is required.",
      }),
    }),
};

export const getGameByIdSchema = object({
    ...getParams
})
export const createGameSchema = object({
    ...payload
});
export const updateGameSchema = object({
    ...payload,
    ...updateDeleteParams
});
export const deleteGameSchema = object({
    ...updateDeleteParams
})

export type GetGameByIdInput = TypeOf<typeof getGameByIdSchema>;
export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>;
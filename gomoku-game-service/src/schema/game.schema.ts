import { string, object, number, array, TypeOf } from "zod";

const payload = {
    body: object({
      userId: string({
        required_error: "User Id is required",
      }),
      size: number({
        required_error: "Size is required",
      }),
      moves: array(array(number({
        required_error: "Moves is required",
      }))),
      date: string({
        required_error: "Date is required",
      }),
      result: string({
        required_error: "Result is required",
      })
    })
  }

const getParams = {
  params: object({
    id: string({
      required_error: "Game Id is required.",
    }),
  }),
};

const updateDeleteParams = {
    params: object({
      id: string({
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
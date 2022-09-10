import { string, object, TypeOf } from "zod";

const payload = {
    body: object({
      // TODO: gameId is here too. 19:30 WK8-4.5
      gameId: string({
        required_error: "Game Id is required",
      }),
      //  Added 19:30 WK8.4-5
      userId: string({
        required_error: "User Id is required",
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

const params = {  // Added 19:30 WK8.4-5. Formerly getParams.
  params: object({
    gameId: string({  // Added 19:30 WK8_4-5. Formerly gameId. ERROR when id.
      required_error: "Game Id is required.",
    }),
  }),
};

const updateDeleteParams = {
    params: object({
      gameId: string({  // TODO WK8-4.5: should this be id too? Formerly gameId.
        required_error: "Game Id is required.",
      }),
    }),
};

export const getGameByIdSchema = object({
    ...params  // Formerly getParams. 19:3 WK8.4-5
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
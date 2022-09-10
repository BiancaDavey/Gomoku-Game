import { string, object, number, array, TypeOf } from "zod";

const payload = {
    body: object({
      // TODO: gameId is here too. 19:30 WK8-4.5. 21:00: it's not in GitHub version.
      /* 21:30
      gameId: string({
        required_error: "Game Id is required",
      }),
      */
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
      board: number({
        required_error: "Board is required",
      }),
      //  Added 20:30 WK.8
      stones: array(number({
        required_error: "Stones are required",
      })).nonempty()
    })
  }

// TODO: 21:00 GitHub it's sessionId, here id?
const getParams = {  // Added 19:30 WK8.4-5. Formerly getParams.
  params: object({
    /* 21:30
    gameId: string({  // Added 19:30 WK8_4-5. Formerly gameId. ERROR when id.
    */
    id: string({  // 21:30
      required_error: "Game Id is required.",
    }),
  }),
};

// TODO 21:00: GitHub it's id.
const updateDeleteParams = {
    params: object({
      id: string({  // 21:30  // TODO WK8-4.5: should this be id too? Formerly gameId.
        required_error: "Game Id is required.",
      }),
    }),
};

export const getGameByIdSchema = object({
    ...getParams  // Formerly getParams. 19:3 WK8.4-5
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
import { GAME_STATUS } from './constants'

export type Position = [number, number]

//  11/09 Add _id, like in User.
// TODO: remove _id as it's added automatically? Or, need placeholder for userId?
export type GameData = {
  _id: string
  //userId: string  // 14/09 Added userId.
  size: number
  moves: Position[]
  date: string
  result: GAME_STATUS
}

import { GAME_STATUS } from './constants'

export type Position = [number, number]

//  11/09 Add _id, like in User.
export type GameData = {
  _id: string
  size: number
  moves: Position[]
  date: string
  result: GAME_STATUS
}

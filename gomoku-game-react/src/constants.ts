export const AVAILABLE_GAME_SIZES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export enum STONE_STATUS {
  EMPTY,
  BLACK,
  WHITE,
}

export enum GAME_STATUS {
  BLACK_MOVE = 'Current Player: Player One Black',
  WHITE_MOVE = 'Current Player: Player Two White',
  BLACK_WIN = 'Winner: Player One Black',
  WHITE_WIN = 'Winner: Player Two White',
  DRAW = 'Draw',
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''

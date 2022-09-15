import { useState, useContext } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { UserContext } from '../context'
import { AVAILABLE_GAME_SIZES, GAME_STATUS, API_HOST } from '../constants'
import type { Position, GameData } from '../types'
import style from './Game.module.css'
import { isGameEnded } from '../utils'
import { get, put, del } from '../utils/http'

// TODO: get request to re-render board?
// TODO: 3. Note- error for leaving game, after signed out? Token missing. Maybe disable logout in header while in game?
// 14/09: Note: Games uses Date as id to nav to GameLog.

const isGameOver = (gameStatus: GAME_STATUS) =>
  [GAME_STATUS.DRAW, GAME_STATUS.BLACK_WIN, GAME_STATUS.WHITE_WIN].includes(
    gameStatus
  )
  
export default function Game() {
  const { user } = useContext(UserContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [games, setGames] = useLocalStorage<GameData[]>('games', [])
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.BLACK_MOVE)
  const [moves, setMoves] = useState<Position[]>([])
  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>
  const _id = ""
  const userId = ""
  const date = ""
  
  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size. Return to home page and start again.
      </p>
    )
  }

  const updateGameStatus = async (move: Position) => {
    if (isGameOver(gameStatus)) return
    const updatedMoves = [...moves, move]
    if (isGameEnded(size, updatedMoves)) {
      if (updatedMoves.length === size * size) {
        setGameStatus(GAME_STATUS.DRAW)
      } else if (updatedMoves.length % 2) {
        setGameStatus(GAME_STATUS.BLACK_WIN)
      } else {
        setGameStatus(GAME_STATUS.WHITE_WIN)
      }
    } else {
      setGameStatus(
        updatedMoves.length % 2
          ? GAME_STATUS.WHITE_MOVE
          : GAME_STATUS.BLACK_MOVE
      )
    }
    setMoves(updatedMoves)
    //  GET request to get game details.
    const getDetails = await get<GameData[]>('api/games')
    const currentDetails = getDetails[getDetails.length-1]
    const thisId = currentDetails._id
    // PUT request to update the game upon the user making a move.
    console.log(`Game id: ${thisId}`)
    console.log('Put request to update upon user making a move.')
    await put(`${API_HOST}/api/games/${thisId}`, {
      userId,
      size,
      moves,
      date,
      result: gameStatus
    })
  }

  //  Restart the game.
  const restart = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to restart?')
    )
      return
    setMoves([])
    setGameStatus(GAME_STATUS.BLACK_MOVE)
    //  GET request to get game details.
    const getDetails = await get<GameData[]>('api/games')
    const currentDetails = getDetails[getDetails.length-1]
    const thisId = currentDetails._id
    console.log('Put request to update upon Restart.')
    //  PUT request to update the game upon the user restarting the game.
    await put(`${API_HOST}/api/games/${thisId}`, {
      userId,
      size,
      moves: [[]],
      date,
      result: gameStatus
    }) 
  }

  const leaveGame = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure you want to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { _id, userId, size, moves, date: new Date().toString(), result: gameStatus },
      ])
      navigate('/games')
      //  GET request to get game details.
      const getDetails = await get<GameData[]>('api/games')
      const currentDetails = getDetails[getDetails.length-1]
      const thisId = currentDetails._id
      // PUT request to update the game upon the user leaving the game with the game being finished.
      console.log('Put request to update upon user leaving game.')
      await put(`${API_HOST}/api/games/${thisId}`, {
        userId,
        size,
        moves,
        date: new Date().toString(),
        result: gameStatus
      }) 
    } else {
      navigate('/')
      //  GET request to get game details.
      const getDetails = await get<GameData[]>('api/games')
      const getId = getDetails[getDetails.length-1]
      const thisId = getId._id
      //  DELETE request to delete the game if the user leaves with the game not being finished.
      await del(`${API_HOST}/api/games/${thisId}`)
    }
  }
  
  return (
    <>
      <p className={style.message}>{gameStatus}</p>
      <Board
        size={size}
        updateGameStatus={updateGameStatus}
        moves={moves}
        readonly={isGameOver(gameStatus)}
      />
      <div className={style.buttons}>
        <Button type="button" onClick={restart}>
          Restart
        </Button>
        <Button type="button" onClick={leaveGame}>
          Leave
        </Button>
      </div>
    </>
  )
}

import { useState, useContext, useCallback } from 'react'
import { Navigate, useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { UserContext } from '../context'
import { AVAILABLE_GAME_SIZES, GAME_STATUS, API_HOST, GameActionType } from '../constants'
//import { GameAction } from '../types/GameAction'
import { GameDetails } from '../types/GameDetails'
import type { Position, GameData } from '../types'
import style from './Game.module.css'
import { isGameEnded } from '../utils'
import { get, put, del } from '../utils/http'

// TODO: get request to re-render board.
// TODO: put request to update board.
//  14/09: Note: Games uses Date as id to nav to GameLog.

const isGameOver = (gameStatus: GAME_STATUS) =>
  [GAME_STATUS.DRAW, GAME_STATUS.BLACK_WIN, GAME_STATUS.WHITE_WIN].includes(
    gameStatus
  )
  
export default function Game() {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  // 13/09 Added.
  const [gameDetails, setGameDetails] = useState<GameDetails>()
  const [games, setGames] = useLocalStorage<GameData[]>('games', [])  // ! ORIGINAL. 
//=============================
  // ! 14/09 TODO: Try adding this, from Games.tsx.
  const [thegames] = useLocalStorage<GameData[]>('games', [])  // 11/09 WK9.6 Remove.
  const [currentGame, setGame] = useState<GameData[]>([])   //  11/09 WK9.6 Added.
//=========================
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.BLACK_MOVE)
  const [moves, setMoves] = useState<Position[]>([])
  // 14/09
  let currentGameId = ""

  /*
  //  TODO: GET request to get current game id.
  const fetchCurrentGameId = useCallback(async () => {
    try {
      const result = await get<GameData[]>('/api/games')
      const thisResult = result[result.length-1]
      //  Id for the current game.
      const thisResultId = thisResult._id
      console.log(`thisResultId: ${thisResultId}`)
      setGame(result)
      //  14/09 Update currentGameId
      currentGameId = thisResultId
      //  Return id.  // !13/09 Added myself. Delete if issues.
      // 15/09: This returns the id.
      return thisResultId
    } catch (error) {
      console.log((error as Error).message)
      navigate('/')
    }
  }, [navigate])
  */

  // 15/09: Trying without useCallback.
    //  TODO: GET request to get current game id.
    const fetchCurrentGameId = async () => {
      try {
        const result = await get<GameData[]>('/api/games')
        const thisResult = result[result.length-1]
        //  Id for the current game.
        const thisResultId = thisResult._id
        console.log(`thisResultId: ${thisResultId}`)
        setGame(result)
        //  14/09 Update currentGameId
        currentGameId = thisResultId
        //  Return id.  // !13/09 Added myself. Delete if issues.
        // 15/09: This returns the id.
        return thisResultId
      } catch (error) {
        console.log((error as Error).message)
        navigate('/')
      }
    }

  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>
  // TODO 11/09: Add _id, or auto generated?
  const _id = ""  // 14/09 Changed from gameId to "". Works ok for POST.
  const userId = ""  // 14/09 Added userId.
  
  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size. Return to home page and start again.
      </p>
    )
  }

  // TODO: PUT request to update moves.
  const updateGameStatus = (move: Position) => {
    if (isGameOver(gameStatus)) return
    const updatedMoves = [...moves, move]
    //getId()  // Added 13/09.
    console.log(`moves: ${moves}`)
    console.log(`move: ${move}`)
    console.log(`updatedMoves: ${updatedMoves}`)
    fetchCurrentGameId()  // 14/09.
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
  }

  //  Restart the game.
  const restart = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to restart?')
    )
      return
    // TODO: PUT request to update moves to 0.
    setMoves([])
    setGameStatus(GAME_STATUS.BLACK_MOVE)
  }

  const leaveGame = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { _id, userId, size, moves, date: new Date().toString(), result: gameStatus },  // 15/09 Added userId.
      ])
      navigate('/games')
      //  TODO: check if const is ok, or if need let/var.
      const getDetails = await get<GameData[]>('api/games')
      const currentDetails = getDetails[getDetails.length-1]  // id, date, moves, result, size
      const thisId = currentDetails._id
      // TODO: PUT request to update game upon game finishing.
      /*
        * 15/09 Added userId, error now gone: userId is required. 
        * 10:30AM 
          * Updated Home.tsx, to be array of arrays 
          * Updated game.schema.ts. 
          * Now PUT request, proxy error, could not proxy request.
          * But error message gone: array. Expected "number", received "array".
      */
      await put(`${API_HOST}/api/games/${thisId}`, {
        //_id,
        userId,
        size,
        moves,
        date: new Date().toString(),
        result: gameStatus
      })
      
    } else {
      navigate('/')
      //  Get game details including id.
      const getDetails = await get<GameData[]>('api/games')
      const getId = getDetails[getDetails.length-1]
      const thisId = getId._id
      //  TODO: check if const is ok, or if need let/var. Seems to be fine.
      //  Delete request to delete the game if the user leaves with the game not being finished.
      await del(`${API_HOST}/api/games/${thisId}`)
    }
  }

// 13/09 Original Leave function (works):
  const leave = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      // TODO: 11/09 Add _id. Or generated auto?
      setGames([
        ...games,
        // 15/09 Added userId.
        { _id, userId, size, moves, date: new Date().toString(), result: gameStatus },
      ])
      navigate('/games')
    } else {
      navigate('/')
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
